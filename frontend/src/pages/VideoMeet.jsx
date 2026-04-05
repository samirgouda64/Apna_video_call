import React, { useEffect, useRef, useState } from "react";
import "../styles/videoComponent.css";
import { Button, TextField } from "@mui/material";

const server_url = "http://localhost:8000";
var connections = {};

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function VideoMeetComponent() {
  var socketRef = useRef();
  let socketIdRef = useRef();

  let localVideoref = useRef();

  let [videoAvailable, setVideoAvailable] = useState(true);

  let [audioAvailable, setAudioAvailable] = useState(true);

  let [video, setVideo] = useState([]);

  let [audio, setAudio] = useState();

  let [screen, setScreen] = useState();

  let [showModal, setModal] = useState(true);

  let [screenAvailable, setScreenAvailable] = useState();

  let [messages, setMessages] = useState([]);

  let [message, setMessage] = useState("");

  let [newMessages, setNewMessages] = useState(3);

  let [askForUsername, setAskForUsername] = useState(true);

  let [username, setUsername] = useState("");

  const videoRef = useRef([]);

  let [videos, setVideos] = useState([]);

  // TODO
  // if(isChrome() === false) {

  // }

  useEffect (() => {
    getPermissions();
  })

  const getPermissions = async () => {
    try {
        const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoPermission) {
            setVideoAvailable(true);
            // console.log("Video Permission Granted");
        } else {
            setVideoAvailable(false);
            // console.log("Video Permission Denied");
        }

        const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (audioPermission) {
            setAudioAvailable(true);
            // console.log("Audio Permission Granted");
        } else {
            setAudioAvailable(false);
            // console.log("Audio Permission Denied");
        }

        if (navigator.mediaDevices.getDisplayMedia) {
            setScreenAvailable(true);
        } else {
            setScreenAvailable(false);
        }

        if (videoAvailable || audioAvailable) {
            const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
            if (userMediaStream) {
                window.localStream = userMediaStream;
                if (localVideoref.current) {
                    localVideoref.current.srcObject = userMediaStream;
                }
            }
        }

    } catch (err) {
        
    }
  }

   let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();

    }

  let connect = () => {
        setAskForUsername(false);
        getMedia();
    }
  return <div>{askForUsername === true ?
     <div>
        <h2>Enter into Lobby </h2>
                    <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
                    <Button variant="contained" onClick={connect}>Connect</Button>


                    <div>
                        <video ref={localVideoref} autoPlay muted></video>
                    </div>
     </div> : <></>
     }
     </div>;
}
