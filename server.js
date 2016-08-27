/**
 * Created by Christian on 2016-08-24.
 */
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var moment = require('moment');
var now = moment(); //snapshot of time when created

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

//listen to events
io.on('connection', function(socket){
    console.log('User connected via socket.io');

    socket.on('joinRoom', function (req) {
        clientInfo[socket.id] = req;    //socket.id = unique socket id by socket.io
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', { //sends only to other sockets in the specified room
            name: 'System',
            text: req.name + ' has joined!',
            timeStamp: moment.valueOf()
        });
    });
    
    socket.emit('message', {
        name: 'System',
        text: 'Welcome to the chat application',
        timestamp: moment.valueOf()
    });

    socket.on('message', function (message) {
        console.log('Message received: ' + moment().format('Do [of] MMM[-]YY HH:mm ') + message.text);

        //socket.broadcast.emit sends it to everybody but sender - io.emit sends to everybody
        message.timestamp = moment.valueOf();
        io.to(clientInfo[socket.id].room).emit('message', message);
    });

    socket.on('disconnect', function (event) {
        console.log('User disconnected');
    })
});


http.listen(PORT, function(){
    console.log('Server started!')
});