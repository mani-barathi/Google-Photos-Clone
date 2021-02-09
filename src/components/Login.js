import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { Button, CircularProgress } from "@material-ui/core"

import { setUser } from "../actions"
import { auth, provider } from "../firebase"

function Login() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const loggedUser = {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email,
                }
                dispatch(setUser(loggedUser))
            }
            else
                setIsLoading(false)
        })
        return unsubscribe
    }, [dispatch])


    const login = () => {
        auth.signInWithPopup(provider)
            .catch(err => alert(err.message))
    }

    return (
        <div style={styles} >
            { isLoading ? (
                <CircularProgress />
            ) : (
                    <>
                        <img src="https://www.google.com/photos/about/static/images/ui/logo-photos.png" alt="" />
                        <Button onClick={login}
                            variant="contained" color="primary" >
                            Sign In With Google
                        </Button>
                    </>
                )}
        </div >
    )
}

const styles = {
    width: "100%",
    height: "100vh",
    display: "grid",
    placeItems: "center"
}

export default Login
