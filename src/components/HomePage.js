import React, { useState, useEffect } from 'react'
import "../css/HomePage.css"
import Album from "./Album"
import Photo from "./Photo"
import CreateAlbumModal from "./CreateAlbumModal"

import { Typography } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add'
import { useSelector, useDispatch } from "react-redux"

import { db } from "../firebase"
import { setCurrentAlbum } from "../actions"

function HomePage() {
    const dispatch = useDispatch()
    const { uid } = useSelector(state => state.user)
    const [isCreateAlbumOpen, setIsCreateAlbumOpen] = useState(false)
    const [albums, setAlbums] = useState([])
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        dispatch(setCurrentAlbum({ albumId: 'ROOT', albumName: 'ROOT' }))
    }, [dispatch])

    useEffect(() => {
        const unsubscribe = db.collection('photos')
            .where('uid', '==', uid)
            .where('albumId', '==', 'ROOT')
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
    }, [uid])

    useEffect(() => {
        const unsubscribe = db.collection('albums')
            .where('uid', '==', uid)
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                setAlbums(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
            })

        return unsubscribe
    }, [uid])

    const handleCreateAlbumModal = () => {
        setIsCreateAlbumOpen(true);
    }

    return (
        <div className="homepage">
            <Typography variant="h5">Albums</Typography>
            <div className="homepage__photos">
                {/* Create Album */}
                <div onClick={handleCreateAlbumModal} title="Create New Album"
                    className="homepage__photoAlbum" style={{ backgroundColor: "#D0D0D0" }}>
                    <AddIcon fontSize="large" />
                </div>

                {  /* Album (Individual) */
                    albums.map(({ id, data }) => <Album key={id} id={id} data={data} />)
                }

            </div>

            {/* Root Directory Photos */}
            <div className="homepage__photos">
                {photos.map(({ id, data }) => <Photo key={id} id={id} data={data} />)}
            </div>

            {/* Modal */}
            <CreateAlbumModal
                uid={uid}
                isCreateAlbumOpen={isCreateAlbumOpen}
                setIsCreateAlbumOpen={setIsCreateAlbumOpen}
            />

        </div>
    )
}

export default HomePage
