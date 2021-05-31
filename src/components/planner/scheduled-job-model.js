import React from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import {Typography, AppBar, Toolbar, Grid, Card, CardHeader, CardContent, Divider} from '@material-ui/core';
// import AttachedAccounts from "./selectedscheduleaccounts";
import SocialView from "components/content-posting/publish/social-view/socialView"
import axios from "axios";
import LocalStore from "../../layers/config/localStore";
import { useSelector} from "react-redux";
export default function ScheduledJobModal(props){

    // const [selectedAccounts,setSelectedAccounts] = useState([]);
    // const dispatch=useDispatch();
    const getUrl =()=>{
        let url = props.data.postContents.mediaUrl[0]
        // var stripped = url.substring(0, url.indexOf('.') + '.'.length);
        return "http://localhost:5080/"+url
            // stripped+"jfif"
    }
    const localStore = new LocalStore();

    const socialAccounts = useSelector(state=>
        state.currTeam.CurrentTeam
    )

    const onDelete = (id)=>{
        axios.delete(`http://localhost:5080/schedule/delete?scheduleId=${id}`,{
            headers: {'x-access-token': localStore.getToken()}
        })
            .then((res)=>{
                console.log(res)
                props.isDeleted();
                // setTimeout(()=>{props.clearSelectedJob(null)},2000)
            })
    }

    console.log("Model")
    console.log(props.data)
    return(
        <div>
            {
            (props.data)?
            <Dialog fullScreen open={true} onClose={() => props.clearSelectedJob(null)}  fullWidth="true">
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h5" color="inherit">
                                    {/* {eventDialog.type === 'new' ? 'New Event' : 'Edit Event'} */}
                                    {"Scheduled Post"}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Typography variant="h4" className="p-4">
                            {"Scheduled Post detail"}
                        </Typography>
                        <DialogContent>
                            <Grid container  >
                                {/*<Grid md={3} item>                    */}
                                {/*    <AttachedAccounts onSelectAccount={(account)=>setSelectedAccounts(account)} />*/}
                                {/*</Grid>*/}
                                <Grid md={1}>
                                    <Card>
                                        <CardHeader className={"bg-grey"} title={"Posting on"} />
                                    <CardContent>
                                        {socialAccounts && socialAccounts.teamSocialAccountDetails[0].SocialAccount.map((item,index)=>{
                                            return(
                                                props.data.postContents.postingSocialIds.map((i,ind)=>{
                                                    return(
                                                        item.account_id === i? <>
                                                            <Typography className={"mb-6"} variant={"h6"}>
                                                                {item.first_name}
                                                            </Typography>

                                                            <Divider />

                                                        </>:<></>
                                                    )
                                                }

                                                )

                                            )

                                        }

                                        )

                                        }

                                    </CardContent>

                                    </Card>

                                    <Card className={"mt-6"}>
                                        <CardHeader className={"bg-grey"} title={"Posting on"} />
                                        <CardContent>
                                            {socialAccounts && socialAccounts.teamSocialAccountDetails[0].SocialAccount.map((item,index)=>{
                                                    return(
                                                        props.data.postContents.postingSocialIds.map((i,ind)=>{
                                                                return(
                                                                    item.account_id === i? <>
                                                                        <Typography className={"mb-6"} variant={"h6"}>
                                                                            {item.first_name}
                                                                        </Typography>

                                                                        <Divider />

                                                                    </>:<></>
                                                                )
                                                            }

                                                        )

                                                    )

                                                }

                                            )

                                            }

                                        </CardContent>

                                    </Card>

                                    <Typography variant="h5" className="p-4 mt-6">
                                        Job Status: <b>{(props.data.scheduleDetails.schedule_status === 6 )? "Posted": "Pending"} </b>
                                    </Typography>

                                    {/*{props.data.postContents.postingSocialIds}*/}
                                </Grid>


                                <Grid className="overflow-hidden" item md={8} style={{ height: '80vh' }} >

                                    <SocialView caption={props.data.postContents.description} img={getUrl()} selectedAccounts={null} />
                                </Grid>
                            </Grid>                           
                        </DialogContent>
                        <DialogActions>
                            <Button variant={"outlined"} onClick={() => props.clearSelectedJob(null)} color="primary">
                                Cancel
                            </Button>
                            <Button color="primary" variant={"outlined"} onClick={()=>{onDelete(props.data.scheduleDetails.schedule_id)}}>
                                Delete
                            </Button>
                            <Button color="primary" variant={"outlined"} onClick={()=>{alert("Edit")}}>
                                Edit
                            </Button>
                        </DialogActions>
            </Dialog>
            :
            <></>
            }
        </div>
    )
}