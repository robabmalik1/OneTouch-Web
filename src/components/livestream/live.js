import React, {useEffect, useRef, useState} from 'react';
import socketIOClient from "socket.io-client";
import {useUserMedia} from "./useUserMedia";



function Live(props) {


    useEffect(()=> {
        },[]
        )

    const socketOptions = {secure: true, reconnection: true, reconnectionDelay: 1000, timeout:15000, pingTimeout: 15000, pingInterval: 45000,query: {framespersecond: 60, audioBitrate: 44100}};
    const socket = socketIOClient("http://localhost:443", socketOptions);

    const CAPTURE_OPTIONS = {
        audio: true,
        video: { facingMode: "environment" },
    };

    const videoRef = useRef();

    function Camera() {

        const mediaStream = useUserMedia(CAPTURE_OPTIONS);

        if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
            videoRef.current.srcObject = mediaStream;
        }

        function handleCanPlay() {
            videoRef.current.play();
        }

        return (
            <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
        );
    }

    // function connect_server(){
    //     // useUserMedia(CAPTURE_OPTIONS);
    //     // navigator.getUserMedia = (navigator.mediaDevices.getUserMedia ||
    //     //     navigator.mediaDevices.mozGetUserMedia ||
    //     //     navigator.mediaDevices.msGetUserMedia ||
    //     //     navigator.mediaDevices.webkitGetUserMedia);
    //     // if(!navigator.getUserMedia){
    //     //     fail('No getUserMedia() available.');
    //     // }
    //     // if(!MediaRecorder){fail('No MediaRecorder available.');}
    //
    //
    //
    //     // console.log("ping interval =", socket.pingInterval, " ping TimeOut" = socket.pingTimeout);
    //     //output_message.innerHTML=socket;
    //
    //     socket.on('connect_timeout', (timeout) => {
    //         console.log("state on connection timeout= " +timeout);
    //         // output_message.innerHTML="Connection timed out";
    //         // recordingCircle.style.fill='gray';
    //
    //     });
    //     socket.on('error', (error) => {
    //         console.log("state on connection error= " +error);
    //         // output_message.innerHTML="Connection error";
    //         // recordingCircle.style.fill='gray';
    //     });
    //
    //     socket.on('connect_error', function(){
    //         console.log("state on connection error= " +state);
    //         // output_message.innerHTML="Connection Failed";
    //         // recordingCircle.style.fill='gray';
    //     });
    //
    //     socket.on('message',function(m){
    //         console.log("state on message= " +state);
    //         console.log('recv server message',m);
    //         show_output('SERVER:'+m);
    //
    //     });
    //
    //     socket.on('fatal',function(m){
    //
    //         show_output('Fatal ERROR: unexpected:'+m);
    //         //alert('Error:'+m);
    //         console.log("fatal socket error!!", m);
    //         console.log("state on fatal error= " +state);
    //         //already stopped and inactive
    //         console.log('media recorder restarted');
    //         // recordingCircle.style.fill='gray';
    //
    //         //mediaRecorder.start();
    //         //state="stop";
    //         //button_start.disabled=true;
    //         //button_server.disabled=false;
    //         //document.getElementById('button_start').disabled=true;　
    //         //restart the server
    //
    //         // if(oo.checked) {
    //         //     //timedCount();
    //         //     output_message.innerHTML="server is reload!";
    //         //     console.log("server is reloading!");
    //         //     recordingCircle.style.fill='gray';
    //         // }
    //         //should reload?
    //     });
    //
    //     socket.on('ffmpeg_stderr',function(m){
    //         //this is the ffmpeg output for each frame
    //         show_output('FFMPEG:'+m);
    //     });
    //
    //     socket.on('disconnect', function (reason) {
    //         console.log("state disconec= " +state);
    //         show_output('ERROR: server disconnected!');
    //         console.log('ERROR: server disconnected!' +reason);
    //         // recordingCircle.style.fill='gray';
    //         //reconnect the server
    //         connect_server();
    //
    //         //socket.open();
    //         //mediaRecorder.stop();
    //         //state="stop";
    //         //button_start.disabled=true;
    //         //button_server.disabled=false;
    //         //	document.getElementById('button_start').disabled=true;　
    //         //var oo=document.getElementById("checkbox_Reconection");
    //         // if(oo.checked) {
    //         //     //timedCount();
    //         //     output_message.innerHTML="server is reloading!";
    //         //     console.log("server is reloading!");
    //         // }
    //     });
    //
    //     state="ready";
    //     console.log("state = " +state);
    //     // button_start.disabled=false;
    //     // button_stop.disabled=false;
    //     // button_server.disabled=true;
    //     // output_message.innerHTML="connect server successful";
    // }

    //Old


    //connect_server;
    // var mediaRecorder;
    // var state ="stop";
    // console.log("state initiated = " +state);
    // var t;
    // // button_start.disabled=true;
    // // button_stop.disabled=true;
    // function video_show(stream){
    //     console.log(stream);
    //     // if ("srcObject" in output_video) {
    //     //     output_video.muted = true;
    //     //     output_video.srcObject = stream;
    //     // } else {
    //     //     output_video.src = window.URL.createObjectURL(stream);
    //     // }
    //     // output_video.addEventListener( "loadedmetadata", function (e) {
    //     //     //console.log(output_video);
    //     //     output_message.innerHTML="Local video source size:"+1920+"x"+1080 ;
    //     // }, false );
    // }
    //
    // function show_output(str){
    //     // output_console.value+="\n"+str;
    //     // output_console.scrollTop = output_console.scrollHeight;
    // };
    //
    //
    // function timedCount(){
    //     var oo=document.getElementById("checkbox_Reconection");
    //     if(oo.checked) {
    //         console.log("timed count state = " +state);
    //         if(state=="ready"  ){
    //             console.log("reconnecting and restarting the media stream");
    //             //do I need to rerun the request media?
    //
    //             connect_server();
    //             // button_start.disabled=false;
    //             // button_server.disabled=true;
    //         }
    //         else{
    //             console.log("not ready yet - wating 1000ms");
    //             t=setTimeout("timedCount()",1000);
    //             connect_server();
    //             // output_message.innerHTML="try connect server ...";
    //             // button_start.disabled=true;
    //             // button_server.disabled=false;
    //         }
    //     }
    //     else
    //     {
    //         //reconnection is off
    //         console.log("reconnection is off, buttons hcnage and we are done.");
    //         // button_start.disabled=true;
    //         // button_server.disabled=false;
    //     }
    // }
    //
    //
    //
    // function requestMedia(){
    //
    //     var constraints = { audio: {sampleRate: 44100,
    //             echoCancellation: true},
    //         video:{
    //             width: { min: 100, ideal: 1920, max: 1920 },
    //             height: { min: 100, ideal: 1080, max: 1080 },
    //             frameRate: {ideal: 60}
    //         }
    //     };
    //     console.log(constraints);
    //     navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    //         video_show(stream);//only show locally, not remotely
    //         // recordingCircle.style.fill='red';
    //         socket.emit('config_rtmpDestination',"rtmp://127.0.0.1/live");
    //         socket.emit('start','start');
    //         mediaRecorder = new MediaRecorder(stream);
    //         mediaRecorder.start(250);
    //         // button_stop.disabled=false;
    //         // button_start.disabled=true;
    //         // button_server.disabled=true;
    //
    //         //show remote stream
    //         var livestream = document.getElementsByClassName("Livestream");
    //         console.log("adding live stream");
    //         livestream.innerHtml = "test";
    //
    //         mediaRecorder.onstop = function(e) {
    //             console.log("stopped!");
    //             console.log(e);
    //             //stream.stop();
    //
    //         }
    //
    //         mediaRecorder.onpause = function(e) {
    //             console.log("media recorder paused!!");
    //             console.log(e);
    //             //stream.stop();
    //
    //         }
    //
    //         mediaRecorder.onerror = function(event) {
    //             let error = event.error;
    //             console.log("error", error.name);
    //
    //         };
    //         //document.getElementById('button_start').disabled=false;　
    //
    //         mediaRecorder.ondataavailable = function(e) {
    //
    //             socket.emit("binarystream",e.data);
    //             state="start";
    //             //chunks.push(e.data);
    //         }
    //     }).catch(function(err) {
    //         console.log('The following error occured: ' + err);
    //         show_output('Local getUserMedia ERROR:'+err);
    //         // output_message.innerHTML="Local video source size is not support or No camera ?"+1920+"x"+1080;
    //         state="stop";
    //         // button_start.disabled=true;
    //         // button_server.disabled=false;
    //     });
    // }
    //
    // function stopStream(){
    //     console.log("stop pressed:");
    //     //stream.getTracks().forEach(track => track.stop())
    //     mediaRecorder.stop();
    //     // recordingCircle.style.fill='gray';
    //     // button_stop.disabled=true;
    //     // button_start.disabled=true;
    //     // button_server.disabled=false;
    // }

    return (
        <>
            <div>
                <h1>Camera</h1>
                {/*<div id="container">*/}
                {/*    <video autoPlay={true} id="videoElement" controls></video>*/}
                {/*</div>*/}
                {/*<br/>*/}
                {/*<button onClick={streamCamVideo}>Start streaming</button>*/}
                {Camera}
                <video ref={videoRef}
                       autoPlay
                       playsInline
                       muted
                       controls
                />
            </div>
        </>
    );
}

export default Live;