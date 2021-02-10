import React, { useRef, useState, useEffect } from 'react'
import "../css/Nav.css"
import { useDispatch, useSelector } from "react-redux"
import { IconButton, Avatar, Button, Tooltip, Typography, Snackbar } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search'
import PublishIcon from '@material-ui/icons/Publish'
import firebase from "firebase"

import { setUser } from "../actions"
import { auth, db, storage } from "../firebase"

function Nav() {
    const dispatch = useDispatch()
    const currentAlbum = useSelector(state => state.currentAlbum)
    const fileRef = useRef()
    const [uploadMessage, setUploadMessage] = useState(null)
    const user = useSelector(state => state.user)

    useEffect(() => {
        console.log(currentAlbum)
    }, [currentAlbum])

    const logout = () => {
        auth.signOut()
            .then(() => dispatch(setUser(null)))
            .catch(err => console.log(err.message))
    }

    const getUploadImages = () => {
        fileRef.current.click()
    }

    const handleUploadImage = () => {
        const photos = fileRef.current.files
        if (photos.length === 0) return

        setUploadMessage(`Uploading ${photos.length} Photo`)

        for (let photo of photos) {
            console.log(photo)
            const data = {
                name: photo.name,
                uid: user.uid,
                albumId: currentAlbum.albumId,
                albumName: currentAlbum.albumName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }

            const uploadTask = storage.ref(`photos/${user.uid}_${photo.name}`).put(photo)
            uploadTask.on('state_change',
                null,
                (error) => {                // error function
                    alert(error.message)
                    console.log(error.message)
                },
                () => {
                    storage.ref('photos').child(`${user.uid}_${photo.name}`)
                        .getDownloadURL().then((url) => {
                            data.photoURL = url             // adding the recived Url
                            db.collection('photos').add(data)
                            setUploadMessage("Photo Uploded Succesfully!")
                        })
                }
            )
        }
    }

    return (
        <div className="nav">
            <div className="nav__logo">
                <Typography variant="h5" >
                    <span style={{ color: "#4285F4" }}>G</span>
                    <span style={{ color: "#DB4437" }}>o</span>
                    <span style={{ color: "#F4B400" }}>o</span>
                    <span style={{ color: "#4285F4" }}>g</span>
                    <span style={{ color: "#0F9D58" }}>l</span>
                    <span style={{ color: "#DB4437" }}>e</span>
                &nbsp;
                <span className="nav__logoText2" >Photos</span>
                </Typography>
            </div>

            <div className="nav_search">
                <SearchIcon className="nav__searchIcon" />
                <input type="text" className="nav__searchInput" placeholder="Search your photos" />
            </div>

            <div className="nav__right">
                <Button startIcon={<PublishIcon />}
                    size="small" className="nav__rightUploadBtn"
                    onClick={getUploadImages}
                >
                    Upload
                </Button>

                <Tooltip title="Logout" arrow >
                    <IconButton onClick={logout} >
                        <Avatar className="nav__rightAvatar" src={user.photoURL} >
                            {user.displayName[0]}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </div>

            <input type="file" onChange={handleUploadImage} ref={fileRef}
                multiple accept="image/*" style={{ display: "none" }} />

            { uploadMessage &&
                <Snackbar
                    onClose={() => setUploadMessage(null)}
                    autoHideDuration={3000}
                    open={Boolean(uploadMessage)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    message={uploadMessage} />
            }


        </div >
    )
}

export default Nav
