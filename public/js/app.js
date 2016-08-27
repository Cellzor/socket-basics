/**
 * Created by Christian on 2016-08-24.
 */
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name +' joined ' + room + ' ');

jQuery('.room-title').text(room);

socket.on('connect', function(){
    console.log('Connected to socket.io server');
    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});

socket.on('message', function(message){
    var momentTimestamp = moment(message.timestamp).local();
    var $messages = jQuery('.messages'); // target by class use .
    var $message = jQuery('<li class="list-group-item"></li>');

    console.log('New message: ' + message.text);

    $message.append('<p><strong>' + message.name.replace(/<\/?[^>]+(>|$)/g, "") + momentTimestamp.format("[ @] HH:mm:") + '</strong></p>');
    $message.append('<p>' + message.text.replace(/<\/?[^>]+(>|$)/g, "") + '</p>');
    $messages.append($message);




    // $message.append('<p><strong>');
    // // $message.text(message.name);
    // $message.append(momentTimestamp.format("[ @] HH:mm:"));
    // $message.append('</strong></p>');
    // $message.append('<p>');
    // // $message.text(message.text);
    // $message.append('</p>');
    // $messages.append($message);
});

// Handles submitting of new message
var $form = jQuery('#message-form');    //# = id select like CSS

$form.on('submit', function(event) {
    event.preventDefault(); // prevents entire page refresh on submit click

    var $message = $form.find('input[name=message]');

    socket.emit('message', {
        name: name,
        text: $message.val()
    });

    $message.val("");
});