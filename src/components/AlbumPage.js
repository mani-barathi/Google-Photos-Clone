import React, { useState, useEffect } from 'react'
import "../css/HomePage.css"
import Photo from "./Photo"

import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import { Typography, IconButton, Button } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { db, storage } from "../firebase"

function AlbumPage() {
    const history = useHistory()
    const currentAlbum = useSelector(state => state.currentAlbum)
    const [photos, setPhotos] = useState([])
    const [open, setOpen] = React.useState(false)

    const openDeleteModal = () => setOpen(true)

    const closeDeleteModal = () => setOpen(false)


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


    const deleteAlbum = () => {
        console.log('inside here!!!!')

        for (let photo of photos) {
            console.log(`${photo.id}_${photo.data.name}`)
            storage.ref('photos').child(`${photo.id}_${photo.data.name}`).delete()
                .then(() => db.collection('photos').doc(photo.id).delete())
        }
        db.collection('albums').doc(currentAlbum.albumId).delete()

        closeDeleteModal()
        history.replace(`/`)
    }

    return (
        <div className="albumpage">
            <div className="albumpage__header">
                <Typography variant="h5">
                    {currentAlbum.albumName}
                </Typography>

                <IconButton onClick={openDeleteModal}>
                    <DeleteIcon />
                </IconButton>

            </div>
            <div className="albumpage__photos">
                {photos.map(({ id, data }) => <Photo key={id} id={id} data={data} />)}
            </div>


            <Dialog
                open={open}
                onClose={closeDeleteModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Album Delete Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting the Album will also delete the Photos inside it...
                        Do you want to delete this Album ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteAlbum} color="primary" autoFocus variant="contained">
                        delete
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default AlbumPage
