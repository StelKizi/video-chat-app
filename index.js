const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Ollo 👋');
});

io.on('connection', socket => {
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callended');
  });

  socket.on('calluser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  socket.on('answecall', data => {
    io.to(data.to).emit('callaccepted', data.signal);
  });
});

server.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
