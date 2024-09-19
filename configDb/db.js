// Aquí importo el módulo mongoose
const mongoose = require('mongoose');
// Aquí importo y configuro el módulo dotenv
require('dotenv').config();

// Aquí defino una función que se encarga de establecer la conexión con MongoDB
const connectionDb = () =>{
// Aquí utilizo el método connect() de mongoose para conectarse a MongoDB. La URI de conexión se obtiene de process.env.DB_MONGO, que fue cargada desde el archivo .env usando dotenv. Esta URI contiene el nombre de usuario, la contraseña y la dirección del cluster de MongoDB que estoy utilizando.
    mongoose.connect(process.env.DB_MONGO)
//Aquí defino un callback que se ejecuta si la conexión a MongoDB es exitosa y se imprime un mensaje en la consola indicando que la conexión ha sido establecida.
    .then(()=>console.log("We are connected with MongoDB"))
// Aquí defino un callback que se ejecuta si ocurre un error durante el intento de conexión y lo imprime en la consola para facilitar su depuración.
    .catch((err)=>console.error(err));
}

// Aquí exporto la función connectionDb para que pueda ser utilizada en otros archivos de la aplicación
module.exports = connectionDb;