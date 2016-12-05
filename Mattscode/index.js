var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
		res.sendFile(__dirname + '/index.html');
		});
users = [];
var roomnumber = 1;
io.on('connection', function(socket){
		if(io.nsps['/'].adapter.rooms['room-'+roomnumber] && io.nsps['/'].adapter.rooms['room-'+roomnumber].length > 1){
		roomnumber++;
		}
		socket.join('room-'+ roomnumber);
		console.log(roomnumber);
		console.log('A user connected');
		socket.on('setUsername', function(data){
				console.log(data);
				if(users.indexOf(data) > -1){
				socket.emit('userExists', data + ' username is taken! Try some other username.');
				}else{
				users.push(data);
				socket.emit('userSet', {username: data});
				}
				});
		socket.on('msg', function(data){
				//Send message to everyone
				console.log(io.sockets.adapter.sids[socket.id]['room-1']);
				console.log(JSON.stringify(io.sockets.adapter.sids[socket.id]));

	for(var i = 1; i <= roomnumber; i++){
		if(io.sockets.adapter.sids[socket.id]['room-' + i] == true){
			io.sockets.in('room-' + i).emit('newmsg', data);
		}
	}

	

				});





});
http.listen(3000, function(){
		console.log('listening on localhost:3000');
		});
