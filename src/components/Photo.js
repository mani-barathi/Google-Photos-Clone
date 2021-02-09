import React from 'react'
import "../css/Photo.css"

function Photo({ data }) {
    return (
        <div className="photo">
            <img src={data.imageUrl} alt="" className="photo__img" />
        </div>
    )
}

export default Photo
