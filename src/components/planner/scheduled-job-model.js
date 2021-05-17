import React, { useState} from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Typography, AppBar, Toolbar, Grid} from '@material-ui/core';
import AttachedAccounts from "./selectedscheduleaccounts";
import SocialView from "components/content-posting/publish/social-view/socialView"
export default function ScheduledJobModal(props){

    const [selectedAccounts,setSelectedAccounts] = useState([]);

    const getUrl =()=>{
        let url = props.data.postContents.mediaUrl[0]
        var stripped = url.substring(0, url.indexOf('.') + '.'.length);
        return "http://localhost:5080/"+props.data.postContents.mediaUrl[0]
            // stripped+"jfif"
    }

    return(
        <div>
            {
            (props.data)?
            <Dialog open={true} onClose={() => props.clearSelectedJob(null)}  fullWidth="true">
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h5" color="inherit">
                                    {/* {eventDialog.type === 'new' ? 'New Event' : 'Edit Event'} */}
                                    {"Scheduled Post"}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Typography variant="subtitle1" className="p-4">
                            {"Scheduled Post detail"}
                        </Typography>
                        <DialogContent>
                            <Grid container >
                                <Grid md={3} item>                    
                                    <AttachedAccounts onSelectAccount={(account)=>setSelectedAccounts(account)} />
                                </Grid>
                                <Grid md={1}></Grid>
                                <Grid className="overflow-hidden" item md={8} style={{ height: '80vh' }} >
                                    <Typography variant="h5" className="p-4">
                                        Job Status:{(props.data.scheduleDetails.schedule_status === 6 )? "Posted": "Pending"}
                                    </Typography>
                                    <SocialView caption={props.data.postContents.description} img={getUrl()} selectedAccounts={null} />
                                </Grid>
                            </Grid>                           
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => props.clearSelectedJob(null)} color="primary">
                                Cancel
                            </Button>
                            <Button color="primary">
                                Login
                            </Button>
                        </DialogActions>
            </Dialog>
            :
            <></>
            }
        </div>
    )
}