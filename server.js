/**
 * Created by Christian on 2016-08-24.
 */
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var moment = require('moment');
var now = moment();

app.use(express.static(__dirname + '/public'));

//listen to events
io.on('connection', function(socket){
    console.log('User connected via socket.io');

    socket.on('message', function (message) {
        console.log('Message received: ' + now.format('Do [of] MMM[-]YY HH:mm ') + message.text);

        //socket.broadcast sends it to everybody but sender - io.emit sends to everybody
        temp = message.text;
        message.text = moment.utc(now.valueOf()).local().format('Do [of] MMM[-]YY HH:mm -----') + temp
        io.emit('message', message);
    });

    socket.emit('message', {
        text: now.format('Do [of] MMM[-]YY HH:mm ') + ' ----- Welcome to the chat application'
    });
});

http.listen(PORT, function(){
    console.log('Server started!')
})