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
  const currentAlbum = useSelector((state) => state.currentAlbum);

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
    getAlbumPhotos,
  };
}

export default useFireStore;
