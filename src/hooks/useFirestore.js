import {
  query,
  serverTimestamp,
  collection,
  onSnapshot,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  where,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../firebase";

function useFireStore() {
  const { uid } = useSelector((state) => state.user);
  const currentAlbum = useSelector((state) => state.currentAlbum);

  // setUploadMessage is a setState method to set Feedback messages
  const uploadPhoto = (photos, setUploadMessage) => {
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

  const deletePhoto = (id, fileName) => {
    const photoRef = ref(storage, `photos/${fileName}`);
    deleteObject(photoRef)
      .then(() => deleteDoc(doc(db, "photos", id)))
      .catch((e) => alert(e.message));
  };

  // return a snapshot listener for getting photos in ROOT Album of the user
  const getRootPhotos = (cb) => {
    const q = query(
      collection(db, "photos"),
      where("uid", "==", uid),
      where("albumId", "==", "ROOT"),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, cb);
  };

  // return a snapshot listener for getting albums of the user
  const getAlbums = (cb) => {
    const q = query(
      collection(db, "albums"),
      where("uid", "==", uid),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, cb);
  };

  const createAlbum = (albumName) => {
    const newDoc = {
      name: albumName,
      uid: uid,
      createdAt: serverTimestamp(),
    };
    return addDoc(collection(db, "albums"), newDoc);
  };

  // return a snapshot listener for getting all Photos of the particular Album
  const getAlbumPhotos = (cb) => {
    const q = query(
      collection(db, "photos"),
      where("albumId", "==", currentAlbum.albumId),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, cb);
  };

  const deleteAlbum = (photos) => {
    for (let photo of photos) {
      const photoRef = ref(storage, `photos/${photo.id}_${photo.data.name}`);
      deleteObject(photoRef)
        .then(() => deleteDoc(doc(db, "photos", photo.id)))
        .catch((e) => console.log(e.message));
    }
    deleteDoc(doc(db, "albums", currentAlbum.albumId));
  };

  return {
    uploadPhoto,
    deletePhoto,
    getRootPhotos,
    getAlbums,
    createAlbum,
    getAlbumPhotos,
    deleteAlbum,
  };
}

export default useFireStore;
