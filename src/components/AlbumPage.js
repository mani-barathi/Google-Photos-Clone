import React, { useState, useEffect } from 'react'
import "../css/HomePage.css"
import Photo from "./Photo"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Typography } from "@material-ui/core"

import { db } from "../firebase"

function AlbumPage() {
    const history = useHistory()
    const currentAlbum = useSelector(state => state.currentAlbum)
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        if (currentAlbum.albumId === 'ROOT')
            history.replace(`/`)
    }, [history, currentAlbum.albumId])

    useEffect(() => {
        const unsubscribe = db.collection('photos')
            .where('albumId', '==', currentAlbum.albumId)
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                setPhotos(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
            })

        return unsubscribe
    }, [currentAlbum.albumId])

    return (
        <div className="albumpage">
            <Typography variant="h5">
                {currentAlbum.albumName}
            </Typography>

            <div className="albumpage__photos">
                {photos.map(({ id, data }) => <Photo key={id} id={id} data={data} />)}
            </div>

        </div>
    )
}

export default AlbumPage
