var socket = io();

// Con este comando estamos obteniendo datos de los url, 
var params = new URLSearchParams(window.location.search);

// Con la funcion 'has' le estamos preguntando que si el url trae una var  con el nombre 'nombre' 
// el simbolo ! hace que un true lo convierte a false y un false lo convierte a true
// si suponemos que el url trae la variable nombre, entonces nos devuelve true, pero con el signo de ! lo convierte el false y por eso no entra a ejecutar lo que esta dentro de if
if (!params.has('nombre')) {
    // Esta sentencia lo que hace es que reenvia el control a la siguiente pagina, a la pagina que uno le indeque
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

var usuario = {
    // uan vez creado la instacia de un objeto de tipo URLSearchParams, podemos obtener la varible que viene escrita en el url en este caso la variable se llama nombre
    nombre: params.get('nombre')
};

// on es para escuchar, emit es para emitir,
// el evento on, al ser un evento de esucha lleva una funcion que desencadena algo y muchas veces recibe informacion.
// el evento emit, emite un mensaje, muchas veces emite informacion como por ejemplo un usuario

// En esta sentencia estariamos diciendo que estamos pendiente de la escucha del evento connecto, y eso sucede cuando el cliente se conecta al servidor
// el cliente al conectarse al servidor, se desencadena la funcion que esta adentro, esta funcion se desencadena en el lado del cliente, client-side
socket.on('connect', function () {
    // en este caso tenemos una impresion en la consola del cliente, que dice conectado al servidor, 
    console.log('Conectado al servidor');
    // luego abajo estamos emitiendo un evento llamado 'entrarChat', que en el servidor abra un evento on esperando a ser desencadendo con una funcion.L0
    // si yo me conecto le mando un callback
    socket.emit('entrarChat', usuario, function (resp) {
        console.log('Usuarios Conectados', resp);
    });
});

// escuchar
socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});

// Enviar información
/* socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
// en esta parte estamos escuchando el evento crearMensaje que lo que nos envia desde el backend, es el nombre y el msj de la persona que se desconecto del chat o de nuestro servidor
socket.on('crearMensaje', function (mensaje) {

    console.log('Servidor:', mensaje);

});

// Escuchar cuando un usuario entra o sale del chat
// El evento 'listarPersonas' esta siendo invocado dos veces en el backend, una vez cuando un nuevo usuario se conecta al servidor y la otra vez cuando un usuario se desconecta del servidor
// cada vex que este evento es invocado, nos envia los usuarios que estan conectados al servidor, nosotros aqui en el frontend con este evento cada vez que se invoca recivimos la informacion de los usuarios que estan conectados en el server
socket.on('listarPersonas', function (msj) {
    console.log(msj);
});