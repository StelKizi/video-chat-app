import { Typography, AppBar } from '@material-ui/core';
import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import useStyles from './styles/App';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography align='center' variant='h2'>
          Video Chat
        </Typography>
      </AppBar>
      <VideoPlayer />
      <Options />
    </div>
  );
}

export default App;
