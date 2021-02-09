import React from 'react'
import "../css/HomeView.css"
import Album from "./Album"
import Photo from "./Photo"

import { Typography } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add'

import { photos } from "../utils"

function HomeView() {
    const data = { name: "family" }

    return (
        <div className="homeview">
            <Typography variant="h5">Albums</Typography>
            {/* Album List*/}
            <div className="homeview__photos">
                {/* Create Album */}
                <div className="homeview__photoAlbum" style={{ backgroundColor: "#D0D0D0" }}>
                    <AddIcon fontSize="large" />
                </div>

                {/* Album (Individual) */}
                <Album data={data} />
                <Album data={data} />

            </div>

            {/* Root Directory Photos */}
            <div className="homeview__photos">
                {photos.map((photo, i) => <Photo key={i} data={photo} />)}
            </div>
        </div>
    )
}

export default HomeView
