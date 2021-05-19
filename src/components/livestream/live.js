import React, {useEffect, useRef, useState} from 'react';
import io from "socket.io-client";
import Button from "@material-ui/core/Button";


var socketOptions = {secure: true, reconnection: true, reconnectionDelay: 1000, timeout:15000, pingTimeout: 15000, pingInterval: 45000,query: {framespersecond: 60, audioBitrate: 44100}};
const socket = io.connect('http://localhost:443',socketOptions);

function Live(props) {

    const [ me, setMe ] = useState("")
    const [ stream, setStream ] = useState()
    const [ receivingCall, setReceivingCall ] = useState(false)
    const [ caller, setCaller ] = useState("")
    const [ callerSignal, setCallerSignal ] = useState()
    const [ callAccepted, setCallAccepted ] = useState(false)
    const [ idToCall, setIdToCall ] = useState("")
    const [ callEnded, setCallEnded] = useState(false)
    const [ name, setName ] = useState("")
    const [state,setState]=useState(false);
    const [isStreaming,setStreaming]=useState(false);
    const videoRef = useRef()
    const userVideo = useRef()
    const connectionRef= useRef()
    let mediaRecorder;

    function stopStream(){
        console.log("stop pressed: ");
        //stream.getTracks().forEach(track => track.stop())
        if(isStreaming){
        // mediaRecorder.stop();
            if(stream.active){
                stream.getTracks().forEach(function(track) {
                    track.stop();
                });
            }
            else{
                setStreaming(false);
            }
            // console.log(stream);
        }
    }

    const startStream =()=>{
        var constraints = { audio: true,
            video: { width: 1280, height: 720
            }
        };

        //{ video: true, audio: true }
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            setStream(stream)
            videoRef.current.srcObject = stream
            socket.emit('config_rtmpDestination',"rtmp://127.0.0.1/live");
            socket.emit('start','start');
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start(250);
            setStreaming(true)
            console.log(stream)
            mediaRecorder.ondataavailable = function(e) {

                socket.emit("binarystream",e.data);
                // state="start";
                //chunks.push(e.data);
            }

        }).catch(function(err) {
            console.log('The following error occured: ' + err);
        });

        socket.on('message',function(m){

            // console.log('recv server message',m);

        });

        socket.on('connect_timeout', (timeout) => {
            console.log("state on connection timeout= " +timeout);

        });
        socket.on('error', (error) => {
            console.log("state on connection error= " +error);
        });

        socket.on('connect_error', function(err){
            console.log(err);
        });

        socket.on('fatal',function(m){

            // console.log('Fatal ERROR: unexpected:'+m);
            console.log("fatal socket error!!", m);
            // console.log("state on fatal error= " +state);
            //already stopped and inactive
            console.log('media recorder restarted');
            // recordingCircle.style.fill='gray';

            //mediaRecorder.start();
            //state="stop";
            //button_start.disabled=true;
            //button_server.disabled=false;
            //document.getElementById('button_start').disabled=true;　
            //restart the server

            //should reload?
        });


        socket.on('ffmpeg_stderr',function(m){
            //this is the ffmpeg output for each frame
            // console.log('FFMPEG:'+m);
        });

    }

    useEffect(() => {
        if(state){
            startStream();
        }
    }, [videoRef,state])

    return (
        <>
            <div className={"p-16"}>
                <Button className={"p-16"} variant={"outlined"} onClick={()=>{setState(true)}} >
                    Start Streaming
                </Button>
                <Button className={"p-16"} variant={"outlined"} onClick={()=>{setState(false); stopStream()}} >
                    Stop Streaming
                </Button>
                <div className="video">
                    {stream &&  <video playsInline muted ref={videoRef} autoPlay style={{ width: "auto" }} />}
                </div>
            </div>
        </>
    );
}

export default Live;