//since we don't pass any arguments it auto connects
//to the server that served the page
var socket = io.connect();

function addMessage(msg, pseudo) {
	$("#chatEntries").append('<div class="message"><p>' + pseudo + ': ' + msg + '</p></div>');
};

function sendMessage() {
	if ($('#messageInput').val() != "") {
		socket.emit('message', $('#messageInput').val());
		addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
		$('#messageInput').val('');
	}
};

function setPseudo() {
	if ($('#pseudoInput').val() != '') {
		socket.emit('setPseudo', $('#pseudoInput').val())
		$('#chatControls').show();
		$('#pseudoInput').hide();
		$('#pseudoSet').hide();
	}
};

socket.on('message', function(data) {
	addMessage(data['message'], data['pseudo']);
});

$(function() {
	$('#chatControls').hide();
	$('#pseudoSet').click(function() {
		setPseudo();
	});
	$('#submit').click(function() {
		sendMessage();
	});
});


