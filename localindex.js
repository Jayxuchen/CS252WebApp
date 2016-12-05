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
  if(io.nsps['/'].adapter.rooms['room-'+roomnumber] && Object.keys(io.nsps['/'].adapter.rooms['room-'+roomnumber]).length > 1){
    io.in('room-'+roomnumber).emit('start', paragraphs[Math.floor(Math.random() * (paragraphs.length))]);
  }
  console.log('room-'+roomnumber);

  socket.on('chat message', function(msg){
    socket.broadcast.to(socket.rooms[socket.rooms.length - 1]).emit('chat message', msg);
  });

  socket.on('winner', function(){
  	socket.broadcast.to(socket.rooms[socket.rooms.length - 1]).emit('winner', '');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var paragraphs = [
"This is a story about a company that makes balloons go up. We were working on them when we ran out of air. The manager who could make them for us. He was about to order them when a balloon in the corner went up. We had found the extra air? We were glad our balloons all got blown up for the day.",
"When shopping for the best price during a sale, look for the best deal. After deciding what you want versus what you need, look through each department carefully to see what's available. The best policy is to shop for the best price. After seeing what you want during the sale, you need to give the cashier your money. Be sure to give some thought to looking through the return policy on sale items.",
"Before the meeting, take your plan further. Above all, being received well matters. Check how further work will be received before the meeting. Take time to plan and check details. Being ready ranks above how you look."
];