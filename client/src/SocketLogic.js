import React, { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [myDevice, setMyDevice] = useState('');
  const [call, setCall] = useState({});
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [name, setName] = useState('');

  const myVideoRef = useRef();
  const otherUserVideoRef = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideoRef.current.srcObject = currentStream;
      })
      .catch((error) => console.error(error));

    socket.on('my-device', (id) => setMyDevice(id));

    socket.on('call-user', ({ from, name: callerName, signal }) => {
      setCall({ isCallReceived: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setIsCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answer-call', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      otherUserVideoRef.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    /* Settinng initiator to true because we're the calling party */
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('call-user', {
        userToCall: id,
        signalData: data,
        from: myDevice,
        name,
      });
    });

    peer.on('stream', (currentStream) => {
      otherUserVideoRef.current.srcObject = currentStream;
    });

    socket.on('call-accepted', (signal) => {
      setIsCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const terminateCall = () => {
    setIsCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        isCallAccepted,
        myVideoRef,
        otherUserVideoRef,
        stream,
        name,
        setName,
        isCallEnded,
        myDevice,
        callUser,
        answerCall,
        terminateCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
