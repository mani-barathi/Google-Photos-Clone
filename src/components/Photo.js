import React from 'react'
import "../css/Photo.css"

import { Tooltip } from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete'
import GetAppIcon from '@material-ui/icons/GetApp'

import { db, storage } from "../firebase"

function Photo({ id, data }) {

    const handleDeletePhoto = () => {
        storage.ref('photos').child(`${id}_${data.name}`).delete()
            .then(() => db.collection('photos').doc(id).delete())
    }

    return (
        <div className="photo">
            <img src={data.photoURL} alt="" className="photo__img" draggable="false" />
            <div className="photo__options">
                <Tooltip title="Delete">
                    <DeleteIcon onClick={handleDeletePhoto} />
                </Tooltip>

                <small className="photo__optionsName">{data.name}</small>

                <Tooltip title="Download">
                    <GetAppIcon />
                </Tooltip>
            </div>
        </div>
    )
}

export default Photo
