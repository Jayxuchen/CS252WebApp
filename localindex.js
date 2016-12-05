var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

users = [];
var roomnumber = 1;

io.on('connection', function(socket){
  if(io.nsps['/'].adapter.rooms['room-'+roomnumber] && Object.keys(io.nsps['/'].adapter.rooms['room-'+roomnumber]).length > 1){
  	roomnumber++;
  }
  socket.join('room-'+roomnumber);
  console.log('room-'+roomnumber);

  socket.on('chat message', function(msg){
    socket.broadcast.to(socket.rooms[socket.rooms.length - 1]).emit('chat message', msg);
  });

  socket.on('winner', function(){
  	socket.broadcas.to(socket.rooms[socket.rooms.length - 1]).emit('winner', '');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});