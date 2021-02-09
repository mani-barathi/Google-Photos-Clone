import React from 'react'
import "../css/Photo.css"

import { Tooltip } from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete'
import GetAppIcon from '@material-ui/icons/GetApp'

function Photo({ data }) {
    return (
        <div className="photo">
            <img src={data.imageUrl} alt="" className="photo__img" draggable="false" />
            <div className="photo__options">
                <Tooltip title="Delete">
                    <DeleteIcon />
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
