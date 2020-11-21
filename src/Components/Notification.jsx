import { makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react'

const useStyles = makeStyles(theme=>({
    root:{
        top:theme.spacing(9)
    }
}))

const Notification = (props) => {
    const {notify, setNotify} = props;
    const classes = useStyles();

    const handleClose = (e,reason) =>{
        if(reason === 'clickaway'){
            return;
        }
        setNotify({
            ...notify,
            isOpen:false
        })
    }

    return (
        <Snackbar
          open = {notify.isOpen}
          autoHideDuration = {2000}
          anchorOrigin={{
              vertical:'top',
              horizontal:'right'
          }}
          className={classes.root}
          onClose= {handleClose}
        >
            <Alert severity={notify.type}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
