import React from 'react'
import { Grid } from '@material-ui/core';
import { CircularProgress, LinearProgress } from '@material-ui/core';

function Spin() {
    return (
        <Grid item container alignItems="center" justify="center" >
            <Grid item>

                <CircularProgress />

                <LinearProgress />
            </Grid>
        </Grid>
    )
}

export default Spin
