import React from 'react'
import "../css/HomeView.css"
import Photo from "./Photo"
import { photos } from "../utils"

function HomeView() {

    return (
        <div className="homeview">
            {/* <Typography variant="h5">Albums</Typography> */}

            <div className="homeview__photos">
                {photos.map((photo, i) => <Photo key={i} data={photo} />)}
            </div>
        </div>
    )
}

export default HomeView
