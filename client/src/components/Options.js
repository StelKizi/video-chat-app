import React, { useState, useContext } from 'react';
import {
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  Button,
} from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Phone, PhoneDisabled, Assignment } from '@material-ui/icons';
import Notifications from './Notifications';
import { SocketContext } from '../SocketLogic';
import useStyles from '../styles/Options';

const Options = () => {
  const {
    myDevice,
    isCallAccepted,
    isCallEnded,
    name,
    setName,
    terminateCall,
    callUser,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete='off'>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography variant='h6' gutterBottom>
                Account Info
              </Typography>
              <TextField
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              {console.log(myDevice)}
              <CopyToClipboard text={myDevice} className={classes.margin}>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  startIcon={<Assignment fontSize='large' />}
                >
                  Copy your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography variant='h6' gutterBottom>
                Make a call
              </Typography>
              <TextField
                label="Paste user's ID"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />
              <CopyToClipboard text={myDevice} className={classes.margin}>
                {isCallAccepted && !isCallEnded ? (
                  <Button
                    variant='contained'
                    color='secondary'
                    startIcon={<PhoneDisabled fontSize='large' />}
                    fullWidth
                    onClick={terminateCall}
                    className={classes.margin}
                  >
                    Hang Up
                  </Button>
                ) : (
                  <Button
                    variant='contained'
                    color='primary'
                    startIcon={<Phone fontSize='large' />}
                    fullWidth
                    onClick={() => callUser(idToCall)}
                    className={classes.margin}
                  >
                    Start Call
                  </Button>
                )}
              </CopyToClipboard>
            </Grid>
          </Grid>
        </form>
        <Notifications />
      </Paper>
    </Container>
  );
};

export default Options;
