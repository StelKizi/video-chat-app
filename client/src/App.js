import { Typography, AppBar } from '@material-ui/core';
import Options from './components/Options';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <div className='App'>
      <AppBar position='static' color='inherit'>
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
