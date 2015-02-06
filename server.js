var express = require('express'),
jade = require('jade'),
http = require('http'),
app = express();

var io = require('socket.io');
var server = http.createServer(app);

io = io.listen(server);
server.listen(5000);


io.sockets.on('connection', function(socket) {
	socket.on('setPseudo', function(data) {
		// socket.set('pseudo', data);
		socket.pseudo = data;
	});

	socket.on('message', function(message) {

		var data = {'message' : message,
					'pseudo' : socket.pseudo
				};
		socket.broadcast.emit('message', data);
		console.log('user ' + socket.pseudo + ' sent this : ' + message);

		// socket.get('pseudo', function(error, name) {
		// 	var data = {'message' : message,
		// 				'pseudo' : name
		// 			};
		// 	socket.broadcast.emit('message', data);
		// 	console.log('user ' + name + ' sent this : ' + message);
		// });
	});
});


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('home.jade');
});
