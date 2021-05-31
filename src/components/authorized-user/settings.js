import React, {useEffect, useState} from 'react';
import { useSelector} from "react-redux";
import {Avatar, Card, CardContent, CardHeader, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

function Settings() {
    // const dispatch = useDispatch();

    const currUser = useSelector(state => state.currUserDetails.userDetails);
    const currUserLoading =useSelector(state => state.currUserDetails.processingUserDetails);
    const currUserError =useSelector(state => state.currUserDetails.failedUserDetails);

    const [currPicture,setCurrPicture]=useState(null);
    const [currFName,setCurrFName]=useState(null);
    const [currLName,setCurrLName]=useState(null);
    const [currEmail,setCurrEmail]=useState(null);

    useEffect(()=>{
        if(currUser){
        setCurrPicture(currUser.user.profile_picture)
        setCurrFName(currUser.user.first_name)
        setCurrLName(currUser.user.last_name)
        setCurrEmail(currUser.user.email)
        }
    })

    return (
        <>
        {/*    Loading      */}
        {currUserLoading &&
        <div>Loading</div>
        }

            {/*     Success     */}
            {currUser &&
                <>


                    <div style={{padding: "5%"}}>
                    <Avatar src={currPicture} />
                    <TextField  className={"mr-12 mt-12 w-1/2 h-1/3 "} label={"First Name"} value={currFName} />
                    <TextField className={"mt-12 mr-12 w-1/2 h-1/3"} label={"Last Name"} value={currLName} />
                    <TextField className={"mr-12 mt-12 w-1/2 h-1/3"} label={"Email"} value={currEmail}  />
                    </div>
                    <Grid container>
                    <Grid className={"ml-96"} item sm={2}>
                    <Card>
                        <CardHeader className={"bg-grey"} title={"Current Plan"} />
                        <CardContent>
                            <h3>Platinum</h3>
                        </CardContent>
                    </Card>
                    </Grid>
                    <Grid className={"ml-32"} item sm={2}>
                        <Card>
                            <CardHeader className={"bg-grey"} title={"Teams"} />
                            <CardContent>
                                <h3>1</h3>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid className={"ml-32"} item sm={2}>
                        <Card>
                            <CardHeader className={"bg-grey"} title={"Account Expiration Date"} />
                            <CardContent>
                                <h3>2021-07-25 18:13:35</h3>
                            </CardContent>
                        </Card>

                    </Grid>
                    </Grid>


                </>

            }

        {/*    Failed       */}
            {currUserError &&
            JSON.stringify(currUserError)
            }

        </>


    );

}

export default Settings;