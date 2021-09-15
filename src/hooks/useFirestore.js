import firebase from "firebase";
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
      console.log(photo);
      console.log(photoId);
      const data = {
        name: photo.name,
        uid: uid,
        albumId: currentAlbum.albumId,
        albumName: currentAlbum.albumName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      const uploadTask = storage
        .ref(`photos/${photoId}_${photo.name}`)
        .put(photo);
      uploadTask.on(
        "state_change",
        null,
        (error) => {
          // error function
          alert(error.message);
          console.log(error.message);
        },
        () => {
          storage
            .ref("photos")
            .child(`${photoId}_${photo.name}`)
            .getDownloadURL()
            .then((url) => {
              data.photoURL = url; // adding the recived Url
              db.collection("photos").doc(photoId).set(data);
              setUploadMessage("Photo Uploded Succesfully!");
            });
        }
      );
    }
  };

  const deletePhoto = (id, fileName) => {
    storage
      .ref("photos")
      .child(fileName)
      .delete()
      .then(() => db.collection("photos").doc(id).delete())
      .catch((error) => alert(error.message));
  };

  // return a snapshot listener for getting photos in ROOT Album of the user
  const getRootPhotos = () => {
    return db
      .collection("photos")
      .where("uid", "==", uid)
      .where("albumId", "==", "ROOT")
      .orderBy("createdAt", "desc");
  };

  // return a snapshot listener for getting albums of the user
  const getAlbums = () => {
    return db
      .collection("albums")
      .where("uid", "==", uid)
      .orderBy("createdAt", "desc");
  };

  const createAlbum = (albumName) => {
    const data = {
      name: albumName,
      uid: uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    db.collection("albums").add(data);
  };

  // return a snapshot listener for getting all Photos of the particular Album
  const getAlbumPhotos = () => {
    return db
      .collection("photos")
      .where("albumId", "==", currentAlbum.albumId)
      .orderBy("createdAt", "desc");
  };

  const deleteAlbum = (photos) => {
    for (let photo of photos) {
      storage
        .ref("photos")
        .child(`${photo.id}_${photo.data.name}`)
        .delete()
        .then(() => db.collection("photos").doc(photo.id).delete());
    }
    db.collection("albums").doc(currentAlbum.albumId).delete();
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
