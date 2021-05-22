import React, {useEffect, useRef, useState} from 'react'
import Jitsi from 'react-jitsi'
// import LinearProgress from '@material-ui/core/LinearProgress';
import io from "socket.io-client";
import {Button, Paper} from "@material-ui/core";
// const roomName = 'my-super-secret-meeting-123e4567-e89b-12d3-a456-426655440000'
// const userFullName = 'Joseph Strawberry'
// const socket = io("http://localhost:1340");
import Peer from "simple-peer";
import LocalStore from "../../../layers/config/localStore";
import {useSelector} from "react-redux";

const localStore = new LocalStore();

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video playsInline autoPlay height={"40%"} width={"50%"} ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Call = (props) => {
    const [peers, setPeers] = useState([]);
    const [stream, setStream] = useState();
    const socketRef = useRef();
    const userVideo = useRef();
    const myPeer=useRef();
    const peersRef = useRef([]);
    const roomID = 1;

    const [audioMuted, setAudioMuted] = useState(false)
    const [videoMuted, setVideoMuted] = useState(false)

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:1340/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            setStream(stream)
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })
                myPeer.current=peer;
                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

    function toggleMuteAudio(){
        if(stream){
            setAudioMuted(!audioMuted)
            stream.getAudioTracks()[0].enabled = audioMuted
        }
    }

    function toggleMuteVideo(){
        if(stream){
            setVideoMuted(!videoMuted)
            stream.getVideoTracks()[0].enabled = videoMuted
        }
    }

    function endCall(){
        if(myPeer.current){
        myPeer.current.destroy()

        myPeer.current.srcObject=null;
        socketRef.current.emit('close',{to: socketRef.current.id})
        }
    }

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });
        myPeer.current = peer;
        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        peer.on('error',(err)=>{
            endCall();
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    function shareScreen(){
        navigator.mediaDevices.getDisplayMedia({cursor:true})
            .then(screenStream=>{
                myPeer.current.replaceTrack(stream.getVideoTracks()[0],screenStream.getVideoTracks()[0],stream)
                userVideo.current.srcObject=screenStream
                screenStream.getTracks()[0].onended = () =>{
                    myPeer.current.replaceTrack(screenStream.getVideoTracks()[0],stream.getVideoTracks()[0],stream)
                    userVideo.current.srcObject=stream
                }
                })
    }

    return (
        <>
            <Button onClick={()=>{shareScreen()}}>Share Screen</Button>
            <Button onClick={()=>{endCall()}}>End Call</Button>
            <Button onClick={()=>{toggleMuteAudio()}}>Toggle Mic</Button>
            <Button onClick={()=>{toggleMuteVideo()}}>Toggle Camera</Button>
            <Paper
                className={"p-2 h-screen w-9/12 flex flex-wrap "}
            // style={{
            //     padd
            //
            //
            //     padding:"20px"
            //     display: flex;
            //     height: 100vh;
            //     width: 90%;
            //     margin: auto;
            //     flex-wrap: wrap;
            // }}
            >
            <video muted ref={userVideo} height={"40%"} width={"50%"} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
            </Paper>
        </>
    )

}

export default Call;
//
//
//
//
//
// const [displayName, setDisplayName] = useState('')
// const [roomName, setRoomName] = useState('')
// const password="Test123";
// // const [password, setPassword] = useState('')
// const [onCall, setOnCall] = useState(false)
// // const Loader = (<div style={{ position: 'absolute', top: 0, width: '100%' }}>
// //     <LinearProgress />
// // </div>);
// const [stream, setStream] = useState();
// const [yourID, setYourID] = useState("");
// const [users, setUsers] = useState({});
//
// //References
// const userVideo = useRef();
// const socket = useRef();
// const myPeer=useRef();
// const partnerVideo = useRef();
//
// const name = useSelector(state=>state.auth.user.first_name)+" "+useSelector(state=>state.auth.user.last_name);
// const currUser = localStore.getUserId();
//
// useEffect(()=>{
//     socket.current = io.connect("http://localhost:1340")
//     socket.current.on('connect', () => {
//         console.log("Connected")
//         // if(!connected){
//         //     setConnected(true)
//         //     socket.emit('fetchGroups',{team_id: localStore.getCurrTeam()})
//         // socket.emit('fetchNew',currGroup);
//         // }
//     });
//
//     socket.current.on("yourID", (id) => {
//         setYourID(id);
//         //    {id: id,name: name, currUser: currUser}
//     })
//     socket.current.on("allUsers", (users) => {
//         setUsers(users);
//         console.log("allUsers: ",users);
//     })
//
//     socket.current.on("hey", (data) => {
//         console.log("hey: ",data);
//         // setReceivingCall(true);
//         // ringtoneSound.play();
//         // setCaller(data.from);
//         // setCallerSignal(data.signal);
//     })
//
//     socket.current.on('disconnected', function() {
//         // setConnected(false)
//         console.log("Disconnected")
//     });
// },[])
//
//
// function callPeer(id) {
//     if(id!=='' ) {
//         //&& users[id] && id!==yourID
//         navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(stream => {
//             setStream(stream);
//             // setCallingFriend(true)
//             // setCaller(id)
//             if (userVideo.current) {
//                 userVideo.current.srcObject = stream;
//             }
//             const peer = new Peer({
//                 initiator: true,
//                 trickle: false,
//                 config: {
//
//                     iceServers: [
//                         {url: 'stun:stun01.sipphone.com'},
//                         {url: 'stun:stun.ekiga.net'},
//                         {url: 'stun:stun.fwdnet.net'},
//                         {url: 'stun:stun.ideasip.com'},
//                         {url: 'stun:stun.iptel.org'},
//                         {url: 'stun:stun.rixtelecom.se'},
//                         {url: 'stun:stun.schlund.de'},
//                         {url: 'stun:stun.l.google.com:19302'},
//                         {url: 'stun:stun1.l.google.com:19302'},
//                         {url: 'stun:stun2.l.google.com:19302'},
//                         {url: 'stun:stun3.l.google.com:19302'},
//                         {url: 'stun:stun4.l.google.com:19302'},
//                         {url: 'stun:stunserver.org'},
//                         {url: 'stun:stun.softjoys.com'},
//                         {url: 'stun:stun.voiparound.com'},
//                         {url: 'stun:stun.voipbuster.com'},
//                         {url: 'stun:stun.voipstunt.com'},
//                         {url: 'stun:stun.voxgratia.org'},
//                         {url: 'stun:stun.xten.com'},
//                         {
//                             url: 'turn:numb.viagenie.ca',
//                             credential: 'muazkh',
//                             username: 'webrtc@live.com'
//                         },
//                         {
//                             url: 'turn:192.158.29.39:3478?transport=udp',
//                             credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
//                             username: '28224511:1379330808'
//                         },
//                         {
//                             url: 'turn:192.158.29.39:3478?transport=tcp',
//                             credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
//                             username: '28224511:1379330808'
//                         }
//                     ]
//                 },
//                 stream: stream,
//             });
//
//             myPeer.current =peer;
//
//             peer.on("signal",data=>{
//                 socket.current.emit("callUser", {userToCall: id, signalData: data, from: yourID})
//             })
//
//             peer.on("stream", stream => {
//                 if (partnerVideo.current) {
//                     partnerVideo.current.srcObject = stream;
//                 }
//             });
//
//             peer.on('error', (err)=>{
//                 alert("Error 133")
//                 // endCall()
//             })
//
//             socket.current.on("callAccepted", signal => {
//                 // setCallAccepted(true);
//                 peer.signal(signal);
//             })
//
//             socket.current.on('close', ()=>{
//                 window.location.reload()
//             })
//
//             socket.current.on('rejected', ()=>{
//                 window.location.reload()
//             })
//         })
//             .catch(()=>{
//                 alert("Error")
//                 // setModalMessage('You cannot place/ receive a call without granting video and audio permissions! Please change your settings to use Cuckoo.')
//                 // setModalVisible(true)
//             })
//
//     }
// }
//
//
//
//
// let UserVideo;
// if (stream) {
//     UserVideo = (
//         <video className="userVideo" playsInline muted ref={userVideo} autoPlay />
//     );
// }
//
// return onCall
//     ? (
//         <Jitsi
//             roomName={roomName}
//             displayName={displayName}
//             password={password}
//             // loadingComponent={Loader}
//             onAPILoad={JitsiMeetAPI => console.log('Good Morning everyone!')}
//             containerStyle={{ width: '1200px', height: '800px', narginLeft: '5%' }}
//             // frameStyle={{ display: loading ? 'none' : 'block', width: '100%', height: '100%' }}
//             config={{ prejoinPageEnabled: false }}
//             // , startAudioOnly: true
//             // config={{ startAudioOnly: true }}
//             // interfaceConfig={{ filmStripOnly: true }}
//         />)
//     : (
//         <>
//             {/*<h1>Crate a Meeting</h1>*/}
//             {/*<input type='text' placeholder='Room name' value={roomName} onChange={e => setRoomName(e.target.value)} />*/}
//             {/*<input type='text' placeholder='Your name' value={displayName} onChange={e => setDisplayName(e.target.value)} />*/}
//             {/*<button onClick={() => setOnCall(true)}> Let&apos;s start!</button>*/}
//
//             <Button onClick={()=>{callPeer(1)}}>
//                 Call
//             </Button>
//             <div className="userVideoContainer">
//                 {UserVideo}
//             </div>
//         </>
//     )
