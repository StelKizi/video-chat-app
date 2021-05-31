import React, { useContext } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { SocketContext } from '../SocketLogic';
import useStyles from '../styles/VideoPlayer';

const VideoPlayer = () => {
  const {
    name,
    isCallAccepted,
    isCallEnded,
    stream,
    call,
    myVideoRef,
    otherUserVideoRef,
  } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {/* My video */}
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant='h5' gutterBottom>
              {name || 'Name'}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideoRef}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}

      {/* Other video */}

      {isCallAccepted && !isCallEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant='h5' gutterBottom>
              {call.name || 'Name'}
            </Typography>
            <video
              playsInline
              ref={otherUserVideoRef}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
