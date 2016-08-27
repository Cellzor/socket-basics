/**
 * Created by Christian on 2016-08-24.
 */
var socket = io();

socket.on('connect', function(){
    console.log('Connected to socket.io server');
});

socket.on('message', function(message){
    var momentTimestamp = moment(message.timestamp).local();
    console.log('New message: ' + message.text);

    jQuery('.messages').append('<p><strong>' + momentTimestamp.format("Do [of] MMM[-]YY[,] HH:mm :") + '</strong>' + message.text + '</p>');     // target by class use .
});

// Handles submitting of new message
var $form = jQuery('#message-form');    //# = id select like CSS

$form.on('submit', function(event) {
    event.preventDefault(); // prevents entire page refresh on submit click

    var $message = $form.find('input[name=message]');

    socket.emit('message', {
        text: $message.val()
    });

    $message.val("");
});