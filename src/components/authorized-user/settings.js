import React, {useEffect, useState} from 'react';
import { useSelector} from "react-redux";
import {Avatar, TextField} from "@material-ui/core";

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
                    <TextField className={"mr-12 mt-12"} label={"First Name"} value={currFName} />
                    <TextField className={"mt-12"} label={"Last Name"} value={currLName} />
                    <br/>
                        <TextField className={"mt-12"} label={"Email"} value={currEmail} style={{width: '235px'}} />
                    </div>

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