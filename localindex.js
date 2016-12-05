var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('winner', function(){
  	socket.broadcast.emit('winner', '');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});