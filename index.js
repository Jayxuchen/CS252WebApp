var express = require('express');
var app = express();
var cfenv = require('cfenv');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var appEnv = cfenv.getAppEnv();
http.listen(appEnv.port || 3000);

app.use(express.static(__dirname + '/public'));

users = [];
var roomnumber = 1;

io.on('connection', function(socket){
  if(io.nsps['/'].adapter.rooms['room-'+roomnumber] && Object.keys(io.nsps['/'].adapter.rooms['room-'+roomnumber]).length > 1){
    roomnumber++;
  }
  socket.join('room-'+roomnumber);
  if(io.nsps['/'].adapter.rooms['room-'+roomnumber] && Object.keys(io.nsps['/'].adapter.rooms['room-'+roomnumber]).length > 1){
    io.in('room-'+roomnumber).emit('start', 'type this please');
  }
  console.log('room-'+roomnumber);

  socket.on('chat message', function(msg){
    socket.broadcast.to(socket.rooms[socket.rooms.length - 1]).emit('chat message', msg);
  });

  socket.on('winner', function(){
    socket.broadcast.to(socket.rooms[socket.rooms.length - 1]).emit('winner', '');
  });
});
