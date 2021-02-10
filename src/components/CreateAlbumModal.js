import React, { useRef } from 'react'

import { Button, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function CreateAlbumModal({ isCreateAlbumOpen, setIsCreateAlbumOpen }) {
    const inputRef = useRef()

    const handleCreateAlbum = (e) => {
        e.preventDefault()
        console.log(inputRef.current.value)
        setIsCreateAlbumOpen(false);
    }

    const handleClose = () => {
        setIsCreateAlbumOpen(false);
    }

    return (
        <div>
            <Dialog open={isCreateAlbumOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Album</DialogTitle>

                <form onSubmit={handleCreateAlbum} autoComplete="off">
                    <DialogContent>
                        <Typography>
                            Enter a name for your new Album
                       </Typography>
                        <TextField autoFocus margin="dense" id="name"
                            label="Album Name" type="text"
                            fullWidth required inputRef={inputRef}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" variant="contained">
                            Create
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>
        </div>
    );
}

export default CreateAlbumModal
