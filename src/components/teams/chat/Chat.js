import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
    Avatar,
    Divider,
    Fab, Icon,
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
import io from "socket.io-client";
import axios from "axios";
import LocalStore from "../../../layers/config/localStore";
import Moment from "react-moment";


const drawerWidth = 240;
const useStyles = makeStyles({
    table: {
        minWidth: 350,
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    sidebar: {
        borderRight: '1px solid #e0e0e0',
        backgroundColor: 'white',
        maxWidth: '400px',
        gridRowStart: 1,
        gridRowEnd: 'span 3'
    },
    messageArea: {
        height: '75vh',
        overflowY: 'scroll'

    },
    search:{
        backgroundColor: 'lightskyblue',
        borderRadius: '20px'
    }
});
const localStore = new LocalStore();
// const socketOptions = {secure: true, reconnection: true, reconnectionDelay: 1000, timeout:15000, pingTimeout: 15000, pingInterval: 45000,withCredentials: true,extraHeaders: {"x-access-token": localStore.getToken()}};
const socket = io(process.env.REACT_APP_CHAT_API_URL_HEROKU);


function Chat(props) {
    const classes = useStyles();

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const currTeam = useSelector(state => state.currTeam.CurrentTeam);
    const currTeamLoading = useSelector(state => state.currTeam.processingTeams);
    const [groups,setGroups]=useState(null);
    const [groupSelected,setGroupSelected]=useState(false);
    const [newMessage,setNewMessage] = useState('');
    const [currGroup,setCurrGroup] = useState(1);
    const messageEl = useRef(null);
    const [isTyping,setIsTyping]=useState(false);
    // const socket = io('http://localhost:1337/');
    const [connected,setConnected]=useState(false);

    const name = useSelector(state=>state.auth.user.first_name)+" "+useSelector(state=>state.auth.user.last_name);
    const currUser = localStore.getUserId();
    useEffect(()=>{
        // const eventHandler = ()=> setConnected(true);

        socket.on('connect', () => {
            console.log("Connected")
            if(!connected){
            setConnected(true)
            socket.emit('fetchGroups',{team_id: localStore.getCurrTeam()})
            socket.emit('fetchNew',currGroup);
            }
                // fetchNewMessages(currGroup)
            return ()=>{
                socket.off("connected",()=>{socket.disconnect()});
            }
        });



        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
        });
        //
        socket.on('allMessages',(data)=>{
            console.log("Received Message",data);
            setMessages(data);
        })



        socket.on('disconnected', function() {
        setConnected(false)
        });

        socket.on('foundGroups',(data)=>{
            console.log("found Groups:");
            console.log(data)
            setGroups(data);
        })



        // socket.on('typing',(data)=>{
        //     setIsTyping(true);
        // })

        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }

    },[])


    const sendMessage = (event) => {
        event.preventDefault();

        var msgDetails={
            content: message ,
            user_id: localStore.getUserId(),
            name: name,
            group_id: currGroup,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        if(message) {
            socket.emit('sendMessage', msgDetails, () => setMessage(''));
        }
    }


    const fetchNewMessages = (groupId) => (
        socket.emit('fetchNew',groupId)
    );

    // const addNewMessage = (newMessage)  => {
    //     var msgDetails={
    //     content: newMessage ,
    //     user_id: localStore.getUserId(),
    //     group_id: currGroup,
    //      createdAt: new Date(),
    //      updatedAt: new Date()
    //     }
    //
    //     socket.emit('newMessage',msgDetails);
    //     // fetchNewMessages(currGroup)
    //     setNewMessage("");
    // }

    const typo = {group_id: currGroup, user_id: localStore.getUserId(), status: true};
    return (
        <>

            <Grid container component={Paper} className={"h-full w-full"}>
                {/*<Grid item xs={3} lg={3} xl={3} className={classes.sidebar}>*/}
                {/*<Divider />*/}
                {/*<List>*/}
                {/*    {groups && groups.map((item,index)=>{*/}
                {/*        return (<>*/}

                {/*            <ListItem button key={item.id} onClick={()=>{fetchNewMessages(item.id)}} >*/}
                {/*                <ListItemIcon>*/}
                {/*                    <Avatar className={"p-2"} alt={item.id}  > {item.group_name} </Avatar>*/}
                {/*                </ListItemIcon>*/}
                {/*                <ListItemText className={"text-lg"} primary={item.group_name}>{item.group_name}</ListItemText>*/}
                {/*            </ListItem>*/}
                {/*                <Divider />*/}
                {/*        </>*/}
                {/*        )*/}
                {/*    }*/}
                {/*    )*/}
                {/*    }*/}
                {/*</List>*/}
                {/*</Grid>*/}
                <Grid item xs={12}>


                    <List className={classes.messageArea} ref={messageEl}>
                        {messages &&

                            messages.map((msg,index)=>{
                                return(
                                    <>
                                    <ListItem key={index}>
                                        <Grid container>
                                            {/*<Grid container spacing={1} alignItems="flex-end">*/}
                                            {msg.user_id==currUser?
                                                <>

                                                    <Grid item xs={12}>
                                                        <ListItemText className={
                                                            " float-right bg-blue w-2/4 mx-4 my-2 p-2 rounded-lg clearfix"
                                                        } align="right" primary={<>
                                                            <div className="w-full talk-bubble tri-right btm-right ">
                                                                <div className="talktext-right h-full">
                                                                    <p className={"text-base text-white"}>{msg.content}</p>
                                                                    <p className={"text-sm text-white"} >{<Moment locale={"ru"} fromNow add={{hours: 5}} date={msg.createdAt}/>}</p>
                                                                </div>
                                                            </div>
                                                        </>}>
                                                        </ListItemText>

                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        {/*<ListItemText align="right" secondary={(msg.user_detail.user_name || "error") }></ListItemText>*/}
                                                        <ListItemText  align="right" secondary={
                                                            <>
                                                                <p className={"text-base "}>{(msg.name || "error")}</p>
                                                            </>
                                                            }></ListItemText>
                                                    </Grid>
                                                </>
                                            :
                                                <>
                                                    <Grid item xs={12}>

                                                        {/*<ListItemText align="left" secondary={(msg.user_detail)?msg.user_detail.user_name:""}></ListItemText>*/}
                                                        <ListItemText className={"ml-8 "} align="left" secondary={
                                                         <>
                                                         <p className={"text-base "}>{msg.name}</p>

                                                         </>
                                                        }></ListItemText>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <ListItemText className={
                                                            " float-left bg-red-light ml-64 w-2/4 mx-4 my-2 p-2 rounded-lg clearfix"
                                                        } align="left" primary={<>
                                                            <div className=" talk-bubble  tri-right left-top">
                                                                <div className="talktext text-right h-full">
                                                                    <p className={"text-base text-white mb-64"}>{msg.content}</p>
                                                                    <p className={"text-sm text-white"} >{<Moment locale={"ru"} fromNow add={{hours: 5}} date={msg.createdAt}/>}</p>
                                                                </div>
                                                            </div>
                                                        </>} />


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
                    {/*{isTyping?<p>Typing</p>:""}*/}
                    <Divider />
                    <Grid container style={{padding: '20px'}}>
                        <Grid item xs={11}>
                            {/* socket.emit("is_typing",typo);*/}
                            <TextField id="outlined-basic-email"  value={message} onChange={e=>{setMessage(e.target.value);}} onKeyPress={e=>{if(e.key === 'Enter'){sendMessage(e)}
                            }} label="Type here" fullWidth />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add" onClick={(e)=>{
                                // addNewMessage(newMessage)
                                sendMessage(e)
                            }}

                            ><Icon>send</Icon> </Fab>
                        </Grid>
                    </Grid>
                    {/*{!groupSelected && <h1>Select a group</h1>}*/}
                </Grid>
            </Grid>
        </>
        );
}
export default Chat;