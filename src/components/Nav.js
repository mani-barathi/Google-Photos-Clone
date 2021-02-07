import React, { } from 'react'
import "../css/Nav.css"

import { IconButton, Avatar, Button } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search'
import PublishIcon from '@material-ui/icons/Publish'

function Nav() {

    const logout = () => {

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

                <IconButton onClick={logout}>
                    <Avatar className="nav__rightAvatar" src="https://avatars.githubusercontent.com/u/49336839?s=460&u=fbbc21b3ee2066b82cf7ddf1205524757ac5f3f4&v=4" />
                </IconButton>
            </div>

        </div >

    )
}

export default Nav
