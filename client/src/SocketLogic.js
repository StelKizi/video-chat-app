import React, { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
const socket = 'http://localhost:5000';

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [myDevice, setMyDevice] = useState('');
  const [call, setCall] = useState({});
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);

  const myVideoRef = useRef();
  const otherUserVideoRef = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideoRef.current.srcObject = currentStream;
      });

    socket.on('mydevice', (id) => setMyDevice(id));

    socket.on('calluser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const callUser = () => {
    setIsCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answercall', { signal: data, to: call.from });
    });

    peer.on('currentStream', (currentStream) => {
      otherUserVideoRef.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const answerCall = () => {};

  const terminateCall = () => {};
};
