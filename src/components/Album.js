import React from "react";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { setCurrentAlbum } from "../actions";

function Album({ id, data }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleAlbumClick = () => {
    dispatch(setCurrentAlbum({ albumId: id, albumName: data.name }));
    history.push(`/album/${data.name}`);
  };

  return (
    <div className="homepage__photoAlbum" onClick={handleAlbumClick}>
      <PhotoLibraryIcon fontSize="large" />
      <Typography variant="h6">{data.name}</Typography>
    </div>
  );
}

export default Album;
