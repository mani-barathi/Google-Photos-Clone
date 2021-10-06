import {
  query,
  collection,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../firebase";

function useFireStore() {
  const { uid } = useSelector((state) => state.user);
  const currentAlbum = useSelector((state) => state.currentAlbum);

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

  // return a snapshot listener for getting all Photos of the particular Album
  const getAlbumPhotos = (cb) => {
    const q = query(
      collection(db, "photos"),
      where("albumId", "==", currentAlbum.albumId),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, cb);
  };

  return {
    getRootPhotos,
    getAlbumPhotos,
  };
}

export default useFireStore;
