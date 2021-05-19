import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { SocketContext } from '../SocketLogic';

const Notifications = () => {
  const { call, isCallAccepted, answerCall } = useContext(SocketContext);

  return (
    <>
      {call.isCallReceived && !isCallAccepted && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>{call.name} is calling: &nbsp;</h1>
          <Button variant='contained' color='primary' onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
