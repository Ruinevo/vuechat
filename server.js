const SERVER_PORT = 8502;

const express = require('express');
const app = express();

const DIR_NAME_WITH_STATIC = 'dist';

const basePath = require('path').join(__dirname, DIR_NAME_WITH_STATIC);

const ALLOW_CORS = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

app.use(express.static(basePath));
app.use(ALLOW_CORS);

const server = app.listen(SERVER_PORT, () => console.log(`Server starting on port ${SERVER_PORT}`));

const io = require('socket.io').listen(server);

let users = [];

io.on('connect', socket => {
  let userName = null;

  /** listen sigup of user */
  socket.on('verify', (user) => {
    userName = user;
    users.push(user);
    /** emit user's enter */
    io.emit('chat_enter', {
      user,
      type: 'enter'
    })
    io.emit('users_reload', users);
  });

  /** listen new message */
  socket.on('send', (message) => {
    io.emit('chat_message', {
      user: userName,
      message
    });
  })

  /** listen exit of user from chat */
  socket.on('leave', (user) => {
    users = users.filter(item => item !== user);
    io.emit('users_reload', users);
    io.emit('chat_leave', {
      user,
      type: 'leave'
    });
  })
});
