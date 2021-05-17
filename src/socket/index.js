import socketIOClient from "socket.io-client";

export let  socket = null

export const  initiateConnection  = ()=>{
    socket = socketIOClient('http://localhost:1337/');
}