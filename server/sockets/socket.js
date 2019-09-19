const {
    io
} = require('../server');

const {
    Usuarios
} = require('../classes/usuarios');

const {
    crearMensaje
} = require('../utilidades/utilidades');

// Estamos creando una instancia de un objeto de tipo Usuarios()
const usuarios = new Usuarios();


io.on('connection', (client) => {
    // en esta sentencia, usando el on, el on es para la escucha, estamos del lado del servidor, estamos escuchando el evento entrarChat, que se emite en el cliente
    // la funcion on recibe dos parametros, entrarChat, y segundo es una funcion para hacer la resolucion de lo que se necesita, esta funcion a su vez recibe dos parametros, data y una funcion callback
    // la definicion de esta funcion callback esta en la parte del cliente cuando entremos a esta funcion anonima y ejecutemos el callback el control del programa se devolvera para el cliente,
    client.on('entrarChat', (data, callback) => {
        // estamos verificando si la informacion trae al cliente 
        if (!data.nombre) {
            return callback({
                error: true,
                mensaje: 'El Nombre es necesario'
            });
        }
        // en esta parte estamos llamando la funcion agregarPersonas, que recibe client.id y data.nombre,
        // esta funcion lo que hace es que agrega estos datos a un arreglo, y luego nos devuelve todos los datos de ese arreglo
        // dicho arreglo devuelto con todos los usuarios agregados sera manipulado en el lado del cliente
        let personas = usuarios.agregarPersona(client.id, data.nombre);
        // con este callback estamos regresando al frontend la informacion de las personas que existen hasta el momento en el arreglo
        callback(personas);

        // cuando una persona se conecta al chat, estamos emitiendo este msj, listarPersonas, que lo que envia en este caso es lo que devuelve el metodo getPersonas
        // que lo que este metodo devuelve es un objeto llenos con los usuarios que estan conectados al servidor
        client.broadcast.emit('listarPersonas', usuarios.getPersonas());
    });


    //*******************************
    // ESTA PARTE ES CUANDO UNA SE ENVIA UN MENSAJE A GENERAL
    //*******************************
    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(cleint.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.emit('crearMensaje', mensaje);
    });



    //*******************************
    // ESTA PARTE ES CUANDO UNA SE ENVIA UN MENSAJE A GENERAL
    //*******************************

    // Como hemos venido diciendo la funcion on es para escuchar, y aqui estamos eschcuando el evento disconnect 
    // El evento disconnect se desencadena cuando un cliente se desconecta, 
    client.on('disconnect', () => {
        // Lo que estamos haciendo nostros es llamar al metodo que sirve para borrar Usuariops, este metodo solo necesita un id de un cleinte ya existente para poder boorarlo o sacarlo del arreglo
        let personaBorrada = usuarios.borrarPersona(client.id);

        // Cuando una persona se desconecta del chat o de nuestro servidor, ya lo borramos de nuestro arreglo, con la lineas de abajo hacemos que se envie un msj a todos los usuarios conectados
        // Para enviar un msj a todos los usuarios es de la siguiente forma, usamos el broadcast que quiere decir un msj msj para todo el mundo y seguido de la funcioon emit que es la funciond e envio de msj
        // Ponemos el nombre del evento y el segundo parametro es un objeto o la informacion que nosotros queremos que se envie.
        // Como el emit es un metodo del emitir un msj alguien tiene que esucharlo en el frontend y se esucha con un on
        // aqui empezaremos a usar la funcion llamada crearMensajes que esta en utilidades,
        // esta funcion de crearMensaje, recibe 3 parametros el primero, es el nombre y el segundo es el mensaje, al final todo lo devulve como un objeto,
        client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio`));


        // cuando una persona se conecta al chat, estamos emitiendo este msj, listarPersonas, que lo que envia en este caso es lo que devuelve el metodo getPersonas
        // que lo que este metodo devuelve es un objeto llenos con los usuarios que estan conectados al servidor
        client.broadcast.emit('listarPersonas', usuarios.getPersonas());
    });
});