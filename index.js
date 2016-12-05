var express = require('express');
var app = express();
var cfenv = require('cfenv');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var appEnv = cfenv.getAppEnv();
http.listen(appEnv.port || 3000);

app.use(express.static(__dirname + '/public'));



io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('winner', function(){
  	socket.broadcast.emit('winner', '');
  });
});
