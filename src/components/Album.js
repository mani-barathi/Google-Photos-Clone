import React from 'react'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import { Typography } from "@material-ui/core"

function Album({ data }) {
    return (
        <div className="homeview__photoAlbum" >
            <PhotoLibraryIcon fontSize="large" />
            <Typography variant="h6">
                {data.name}
            </Typography>
        </div>
    )
}

export default Album