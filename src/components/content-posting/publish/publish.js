import React, {Component, useEffect, useState} from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import {connect, useSelector} from "react-redux";
import { DatePicker,KeyboardDateTimePicker } from "@material-ui/pickers";
import moment from 'moment/moment';
import Slide from '@material-ui/core/Slide';
import { Card, Dialog, Grid, Input, AppBar, IconButton, Icon } from '@material-ui/core';

import AttachedAccounts from "../connected-accounts/attachedAccounts";
import UnsplashLib from "../../content-library/unsplash/unsplashLib";
import { allAttachedAccounts } from "layers/utils/attachedAccounts";
import { PublishPost } from "layers/services/Publish";
import SocialView from './social-view/socialView';

import SnackBar from "../../misc/snackbar";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Publish(props){
    const [caption,setCaption] = useState("");
    const [date,setDate]= useState(+new Date());
    //moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
    const [openUnsplash,setOpenUnsplash]=useState(false);
    const [imageUrl,setImageUrl] = useState(false);
    const [imageAlt,setImageAlt] = useState(false);
    const [loading,setLoading]=useState(false);
    const [localImage,setLocalImage]=useState(null);
    const [selectedAccounts,setSelectedAccounts] = useState([]);
    const [tabValue,setTabValue]=useState(0);
    const [response,setResponse] = useState(null);

    const accounts = useSelector(state=>state.attached_accounts);

    useEffect(()=>{
    },[])

    const selectedImage = (src, alt) => {
        setImageUrl(src);
        setImageAlt(alt);
        setOpenUnsplash(false);
    }

    const onSubmit = async e => {
        e.preventDefault();
        let post = {
            teamId: localStorage.getItem("CURR_TEAM_ID"),
            caption: caption,
            image: imageUrl,
            upload_date: date,
            localImage: localImage
        }
        await PublishPost(post, selectedAccounts,date, (response)=>{setResponse(response)})
    }

    return (
        <>
            <Grid container xl={12} lg={12} spacing={2}>
                {
                    response &&
                    response.map((value, index)=>(
                        <SnackBar error={value.msg} clear={() => setResponse(null)}/>
                    ))
                }
                <Grid item container xl={12} lg={12} md={12} sm={12} spacing={2} className="ml-12">
                    <Grid item xl={2} lg={2} md={12} sm={12} className="mr-4">
                        <AttachedAccounts onSelectAccount={(account)=>setSelectedAccounts(account)} />
                    </Grid>
                    <Grid item xl={4} lg={4} md={12} sm={12} className="mr-2">
                        <Card className="w-full overflow-hidden mt-24">
                            <Input
                                className="p-16 w-full mt-24"
                                classes={{ root: 'text-14' }}
                                placeholder="Write something.."
                                multiline
                                rows="5"
                                margin="none"
                                disableUnderline
                                value={caption} onChange={e=>setCaption(e.target.value)}
                            />
                            <AppBar className="card-footer flex flex-row border-t-1" position="static" color="default" elevation={0}>
                                <div className="flex-1 items-center">
                                    <input
                                        accept="image/*"
                                        className="inputDoc"
                                        id="contained-address-file"
                                        hidden
                                        type="file"
                                        onChange={e=>{setImageUrl(URL.createObjectURL(e.target.files[0])); setLocalImage(e.target.files[0])}}
                                    />
                                    <IconButton htmlFor="contained-address-file" component="label" >
                                        <Icon>photo</Icon>
                                    </IconButton>
                                    <IconButton aria-label="Mention somebody">
                                        <Icon>person</Icon>
                                    </IconButton>
                                    <Button onClick={() => {setOpenUnsplash(true)}}>

                                        <svg className="p-2" viewBox="0 0 186.5 158.7" width="20" height="50"><path class="st0" d="M23.9 26.4h138.7c8.3 0 11.3.9 14.4 2.5 3 1.6 5.4 4 7 7 1.6 3 2.5 6.1 2.5 14.4v84.4c0 8.3-.9 11.3-2.5 14.4-1.6 3-4 5.4-7 7-3 1.6-6.1 2.5-14.4 2.5H23.9c-8.3 0-11.3-.9-14.4-2.5s-5.4-4-7-7C.9 146.1 0 143 0 134.7V50.4C0 42 .9 39 2.5 36s4-5.4 7-7c3.1-1.7 6.1-2.6 14.4-2.6zm69.4 108.8c24.1 0 43.7-19.7 43.7-44.1S117.4 47 93.3 47 49.5 66.8 49.5 91.1s19.6 44.1 43.8 44.1z" /><ellipse class="st0" cx="94.7" cy="92.6" rx="27.7" ry="27.9" /><path class="st0" d="M43.7 26.3C49 9.5 55 .7 61.6 0l60.4.5c.6 0 1.2.2 1.7.5 7.8 5.4 13.1 13.8 16 25.3 2.9 11.9-29.1 11.9-96 0z" /></svg>
                                        Unsplash
                                    </Button>
                                </div>

                                <div className="p-2">
                                    <Button variant="contained" onClick={onSubmit} color="primary" size="small" aria-label="post">
                                        POST
                                    </Button>
                                </div>

                            </AppBar>
                        </Card>

                        <Card>
                            <AppBar className="flex flex-row border-t-1" position="static" color="default" elevation={0}>
                                <Icon>date_range</Icon>
                                <Typography component="h1" style={{fontSize: 20}}>
                                    {"Schedule"}
                                </Typography>
                            </AppBar>

                            <KeyboardDateTimePicker
                                value={date}
                                onChange={setDate}
                                animateYearScrolling={true}
                                label="Keyboard with error handler"
                                onError={console.log}
                                maxDate={new Date("2022")}
                                disablePast
                                variant="static"
                                format="YYYY/MM/DD hh:mm a"
                            />



                        </Card>
                        <Grid item >
                            <Dialog fullScreen open={openUnsplash} onClose={() => setOpenUnsplash(false)} TransitionComponent={Transition}>
                                <UnsplashLib onImageClick={selectedImage} />
                            </Dialog>
                        </Grid>
                    </Grid>
                    <Grid className="mt-24 overflow-hidden" item xl={5} lg={4} md={12} sm={12} style={{ height: '80vh' }} >
                        <SocialView caption={caption} img={imageUrl} selectedAccounts={selectedAccounts} />
                    </Grid>

                </Grid>
            </Grid>

        </>
    )

}