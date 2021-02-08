import React, { } from 'react'
import "../css/Nav.css"
import { useDispatch, useSelector } from "react-redux"
import { IconButton, Avatar, Button, Tooltip } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search'
import PublishIcon from '@material-ui/icons/Publish'

import { setUser } from "../actions"
import { auth } from "../firebase"

function Nav() {
    const dispatch = useDispatch()
    const user = useSelector(state => state)

    const logout = () => {
        auth.signOut()
            .then(() => dispatch(setUser(null)))
            .catch(err => console.log(err.message))
    }

    return (
        <div className="nav">
            <div className="nav__logo">
                <span className="nav__logoText" style={{ color: "#4285F4" }}>G</span>
                <span className="nav__logoText" style={{ color: "#DB4437" }}>o</span>
                <span className="nav__logoText" style={{ color: "#F4B400" }}>o</span>
                <span className="nav__logoText" style={{ color: "#4285F4" }}>g</span>
                <span className="nav__logoText" style={{ color: "#0F9D58" }}>l</span>
                <span className="nav__logoText" style={{ color: "#DB4437" }}>e</span>
                &nbsp;
                <span className="nav__logoText2" >Photos</span>
            </div>

            <div className="nav_search">
                <SearchIcon className="nav__searchIcon" />
                <input type="text" className="nav__searchInput" placeholder="Search your photos" />
            </div>

            <div className="nav__right">
                <Button
                    startIcon={<PublishIcon />}
                    size="small"
                    className="nav__rightUploadBtn"
                >
                    Upload
                </Button>

                <Tooltip title="Logout" arrow >
                    <IconButton onClick={logout} >
                        <Avatar className="nav__rightAvatar" src={user.photoURL} />
                    </IconButton>
                </Tooltip>
            </div>

        </div >
    )
}

export default Nav
