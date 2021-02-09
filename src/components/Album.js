import React from 'react'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'

function Album({ data }) {
    return (
        <div className="homeview__photoAlbum" >
            <PhotoLibraryIcon fontSize="large" />
            <p className="homeview__photoAlbumName">
                {data.name}
            </p>
        </div>
    )
}

export default Album