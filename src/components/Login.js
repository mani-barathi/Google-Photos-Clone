import React, { useState, useEffect } from 'react'
import { Button, CircularProgress } from "@material-ui/core"
import { auth, provider } from "../firebase"

function Login({ setUser }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user)
                setUser({
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    email: user.email,
                })
            else
                setIsLoading(false)
        })
        return unsubscribe
    }, [setUser])


    const login = () => {
        auth.signInWithPopup(provider)
            .catch(err => alert(err.message))
    }

    return (
        <div className="login" >
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

export default Login
