import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase";

// setUploadMessage is a setState method to set Feedback messages
export const uploadPhoto = (photos, currentAlbum, uid, setUploadMessage) => {
  for (let photo of photos) {
    const photoId = uuidv4();
    const data = {
      name: photo.name,
      uid: uid,
      albumId: currentAlbum.albumId,
      albumName: currentAlbum.albumName,
      createdAt: serverTimestamp(),
    };

    const storageRef = ref(storage, `photos/${photoId}_${photo.name}`);
    const uploadTask = uploadBytesResumable(storageRef, photo);

    uploadTask.on(
      "state_changed",
      null,
      (e) => {
        console.log("Error Uploading", e);
        setUploadMessage("Error while Uploading Photo!");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          data.photoURL = downloadURL; // adding the recived Url
          setDoc(doc(db, "photos", photoId), data);
          setUploadMessage("Photo Uploaded Succesfully!");
        });
      }
    );
  }
};
