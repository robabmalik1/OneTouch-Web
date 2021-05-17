import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
    Avatar,
    Divider,
    Fab,
    IconButton,
    List,
    ListItem,
    ListItemIcon, ListItemSecondaryAction,
    ListItemText,
    TextField
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {useSelector} from "react-redux";
import socketIOClient from "socket.io-client";
import axios from "axios";
import LocalStore from "../../../layers/config/localStore";


const drawerWidth = 240;
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '100%',

    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '75vh',
        overflowY: 'scroll'

    }
});


function Chat(props) {
    const classes = useStyles();
    const localStore = new LocalStore();
    const [messages, setMessages] = useState(null)
    const currTeam = useSelector(state => state.currTeam.CurrentTeam);
    const currTeamLoading = useSelector(state => state.currTeam.processingTeams);
    const [groups,setGroups]=useState(null);
    const [groupSelected,setGroupSelected]=useState(false);
    const [newMessage,setNewMessage] = useState('');
    const [currGroup,setCurrGroup] = useState(null);
    const messageEl = useRef(null);

    // const socket = socketIOClient('http://localhost:1337/');

    useEffect(()=>{

        if(!groups){
            axios.get('http://localhost:1337/groups/'+localStore.getCurrTeam(),{headers: {"x-access-token": localStore.getToken()}})
                .then(res => setGroups(res.data))
        }
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
            // .then(receivedNewMessages => console.log(receivedNewMessages))
        // socket.on("newMessage",(message)=>{
        //     console.log("Got Message")
        //     //setMessages(message)
        // })
        // fetchNewMessages();
        // socket.on('connect', () => {
        //     console.log("Connected");
        //
        //
        // });

        //return () => socket.disconnect();

    })


    const socket = socketIOClient("http://localhost:1337", {
        withCredentials: true,
        extraHeaders: {
            "x-access-token": localStore.getToken()
        }
    });
    socket.on('connect', () => {
        console.log("Connected")
        localStore.getCurrTeam() &&
        fetchNewMessages(localStore.getCurrTeam())
        socket.on('disconnected', function() {
        });
    });


    const fetchNewMessages = (groupId) => (
        axios.get('http://localhost:1337/groups/'+groupId+"/messages",{headers: {"x-access-token": localStore.getToken()}})
            .then(res => setMessages(res.data))
            .then(setCurrGroup(groupId))
            .then(setGroupSelected(true))
    );

    const addNewMessage = (newMessage)  => {
        axios.post(`http://localhost:1337/groups/${newMessage.group_id}/messages`, newMessage, {headers: {"x-access-token": localStore.getToken()}})
            .then(res => res.data)
            .then((createdMessage) => {
                console.log(createdMessage);
                createdMessage.type = 'message';
                socket.emit('newMessage', createdMessage);
            });
        // fetchNewMessages(newMessage.group_id);
        setNewMessage("");
    }


    return (
        <>

            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem key={currTeam && currTeam['teamSocialAccountDetails'][0]['team_id']}>
                            <ListItemText primary={(currTeam && currTeam['teamSocialAccountDetails'][0]['team_name']) || (currTeamLoading && <h1>Loading</h1>)}></ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                        New Group
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <List>
                    {groups && groups.map((item,index)=>{
                        return (<>
                            <ListItem button key={item.id} onClick={()=>{fetchNewMessages(item.id)}} >
                                <ListItemIcon>
                                    <Avatar alt={item.id} src={item.team_information.team_logo} />
                                </ListItemIcon>
                                <ListItemText primary={item.group_name}>{item.group_name}</ListItemText>
                            </ListItem>
                                <Divider />
                        </>
                        )
                    }
                    )
                    }
                </List>
                </Grid>
                <Grid item xs={9}>


                    <List className={classes.messageArea} ref={messageEl}>
                        {messages &&

                            messages.map((msg,index)=>{
                                return(
                                    <>
                                    <ListItem key={index}>
                                        <Grid container>
                                            {/*<Grid container spacing={1} alignItems="flex-end">*/}
                                            {msg.user_id===1?
                                                <>
                                                    <Grid item xs={12}>
                                                        <ListItemText className={
                                                            "bg-blue-light float-right w-2/4 mx-4 my-2 p-2 rounded-lg clearfix"
                                                        } align="right" primary={msg.content}>
                                                        </ListItemText>

                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <ListItemText align="right" secondary={(msg.user_detail.user_name || "error") }></ListItemText>
                                                    </Grid>
                                                </>
                                            :
                                                <>
                                                    <Grid item xs={12}>
                                                        <ListItemText className={
                                                            "bg-pink-light float-left w-2/4 mx-4 my-2 p-2 rounded-lg clearfix"
                                                        } align="left" primary={msg.content}>
                                                        </ListItemText>

                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <ListItemText align="left" secondary={(msg.user_detail)?msg.user_detail.user_name:""}></ListItemText>
                                                    </Grid>
                                                </>
                                            }

                                        </Grid>
                                    </ListItem>

                                    </>
                                )
                            }
                            )
                        }
                    </List>
                    <Divider />
                    <Grid container style={{padding: '20px'}}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" value={newMessage} onChange={e=>setNewMessage(e.target.value)} label="Type Something" fullWidth />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add" onClick={()=>{
                                addNewMessage({content: newMessage ,user_id: localStore.getUserId(),group_id: currGroup })
                            }}>Send</Fab>
                        </Grid>
                    </Grid>
                    {!groupSelected && <h1>Select a group</h1>}
                </Grid>
            </Grid>
        </>
        );
}

export default Chat;