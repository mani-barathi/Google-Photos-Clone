import React, { useRef, useState } from 'react'
import "../css/Nav.css"
import { useDispatch, useSelector } from "react-redux"
import { IconButton, Avatar, Button, Tooltip, Typography, Snackbar } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search'
import PublishIcon from '@material-ui/icons/Publish'

import { setUser } from "../actions"
import { auth } from "../firebase"

function Nav() {
    const fileRef = useRef()
    const [uploadMessage, setUploadMessage] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state => state)

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

        console.log(photos)
        setUploadMessage(`Uploading ${photos.length} Photo`)
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
                        <Avatar className="nav__rightAvatar" src={user.photoURL} />
                    </IconButton>
                </Tooltip>
            </div>

            <input type="file" onChange={handleUploadImage} ref={fileRef}
                multiple accept="image/*" style={{ display: "none" }} />

            {
                <Snackbar
                    open={Boolean(uploadMessage)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    message={uploadMessage} />
            }


        </div >
    )
}

export default Nav
