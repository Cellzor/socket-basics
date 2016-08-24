/**
 * Created by Christian on 2016-08-24.
 */
var socket = io();

socket.on('connect', function(){
    console.log('Connected to socket.io server');
});

socket.on('message', function(message){
    console.log('New message: ' + message.text);
});