import React, {useEffect, useState} from 'react';
import Alert from "@material-ui/lab/Alert";
import {Snackbar} from "@material-ui/core";

function SnackBar(props) {

    const [error,setError]=useState("");
    const toggleAlert = () => {
        setError( null);
    }

    useEffect(()=>{
        console.log(error);
    })

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={(props.error !== "")?true: false}
            onClose={toggleAlert}
            autoHideDuration={6000}
        >
            <Alert
                severity={props.severity}
                onClose={props.clear}
            >
                {props.error}
            </Alert>
        </Snackbar>
    );
}

export default SnackBar