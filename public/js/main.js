$(document).on('ready',inicia);
function inicia(){
	window.io = io.connect();
	io.on('connect', function(socket){
		console.log('Hi');
		//io.emit('oky_doky');
	});

	io.on('saludo', function(data){
		//debugger;
		console.log(data);
	});

	/*
	io.on('data_arduino', function(data){
		//debugger;
		console.log(data.val);
		$('#list_socket').append('<li>'+data.val+'</li>');
	});
	*/
	io.on('log-in', function(data){
		//debugger;
		$('#users').append('<li>'+data.username+'</li>');
	});

	io.on('log-out', function(data){
		//debugger;
		$('#users li').each(function(i, item){
			if($(item).text() === data.username){
				$(item).remove();
			}
		});
	});

	io.on('post', function(data){
		debugger;

		$('#post').append('<p>'+data.user.username+' : '+data.content+'</p>');
	});

}