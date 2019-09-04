class Usuarios {
    // Estamos definiendo el construsctor, el contrusctor es lo primero que se inicializa cuando hace una instancia de un objeto
    // en este caso lo que estamos haciendo es que estamos creando un arreglo vacio llamado persona como parametro o atributo de la clase
    constructor() {
        this.persona = [];
    }

    // con esta funcion lo que estamos haciendo es agregar un arreglo al atributo de las clase Personas, personas que es de tipo array
    agregarPersona(id, nombre) {
        // creamos un objeto, a las cuales le asignamos los valores que recibimos en la funcion, y el emc6, nos permite que si se llaman igual solo necesitamos escribir los nombres       
        let persona = {
            id,
            nombre
        };
        // la funcion push es una funcion para arreglos que lo que haces es que metemos un arreglo al arreglo
        this.persona.push(persona);
        return this.personas;
    }

    getPersona(id) {
        // la funcion filter es un funcion de arreglos que lo que hace es que devuelve un nuevo arreglo depediendo del la condicion que le pngamos abajo
        // en este caso queremos que nos devuelva un arreglo con dependiendo del id que le mandemos en la condicion, en la primera poscicion por eso le ponemos el 0 al final, 
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSalas(sala) {
        //....
    }

    // Necesitamos borrar un arreglo del conjunto de arreglos, en este caso eso lo hacemos con un filter
    borrarPersona(id) {
        let personaBorrada = this.getPersonas(id);
        // como sabemos el filter nos devuelve un nuevo arreglo dependiendo de la condicion que le pongamos,
        // en este caso le estamos diciendo devuelvenos todos los arreglos que son diferentes a id que estamos recibiendo.
        this.persona = this.personas.filter(persona => persona.id != id);
        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}