/**
 * Created by Christian on 2016-08-24.
 */
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

//listen to events
io.on('connection', function(socket){
    console.log('User connected via socket.io');

    socket.on('message', function (message) {
        console.log('Message received: ' + message.text);

        //socket.broadcast sends it to everybody but sender - io.emit sends to everybody
        io.emit('message', message);
    });

    socket.emit('message', {
        text: 'Welcome to the chat application'
    });
});

http.listen(PORT, function(){
    console.log('Server started!')
})