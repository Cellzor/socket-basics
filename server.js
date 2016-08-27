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

//listen to events
io.on('connection', function(socket){
    console.log('User connected via socket.io');

    socket.emit('message', {
        name: 'System',
        text: 'Welcome to the chat application',
        timestamp: moment.valueOf()
    });

    socket.on('message', function (message) {
        console.log('Message received: ' + moment().format('Do [of] MMM[-]YY HH:mm ') + message.text);

        //socket.broadcast.emit sends it to everybody but sender - io.emit sends to everybody
        message.timestamp = moment.valueOf();
        io.emit('message', message);
    });

    socket.on('disconnect', function (event) {
        console.log('User disconnected');
    })
});


http.listen(PORT, function(){
    console.log('Server started!')
});