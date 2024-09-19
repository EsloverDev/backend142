// Aquí importamos el modelo Client, el cual es el esquema de datos que he creado utilizando Mongoose, que define la estructura y las reglas de los documentos que se almacenarán en la colección de clientes en MongoDB.
const Client = require('../models/Client');

// Aquí defino y exporto la función addClient, la cual es una función asíncrona, lo que significa que puede contener operaciones que se ejecutan de manera asíncrona, como la consulta a una base de datos, y permite el uso de await para esperar a que esas operaciones se completen.
exports.addClient = async(req, res) => {
// Aquí utilizo try para manejar errores que puedan ocurrir durante la ejecución del código.
    try{
// La variable objectClient se usará para almacenar una nueva instancia del cliente.
        let objectClient;
// Aquí creo un nuevo objeto Client utilizando los datos que vienen en req.body
        objectClient = new Client(req.body)
// await espera a que la operación de guardado se complete antes de continuar con la siguiente línea de código. Si la operación de guardado es exitosa, el cliente se almacena en objectClient, y después se guarda en la base de datos de MongoDB.
        await objectClient.save();
// Si todo sale bien, se envía una respuesta JSON al cliente (la aplicación o el navegador) con el objeto objectClient, que contiene los datos del cliente que acaba de ser creado y almacenado en la base de datos.
        res.json(objectClient);
// Si ocurre algún error durante el proceso (por ejemplo, un fallo al conectarse a la base de datos), se captura el error.
    } catch(error){
// Aquí imprimo el error en la consola del servidor para ayudar en la depuración.
        console.log("Error:", error.message);
// Aquí se envía una respuesta HTTP con el código de estado 500 (error interno del servidor) al cliente, junto con un mensaje que indica que hubo un problema al crear el cliente.
        res.status(500).send("There was an error creating the client.");
    }
}

// Aquí defino y exporto la función showClients, la cual es una función asíncrona
exports.showClients = async(req, res) => {
// Si algo falla en el bloque try, el control se transfiere al bloque catch
    try{
// Aquí se realiza una operación de búsqueda en la base de datos utilizando el modelo Client. Client.find() es un método de mongoose que consulta todos los documentos en la colección clients. El resultado de la consulta, que es un array de objetos que representan a todos los clientes en la base de datos, se almacena en la constante clients.
        const clients = await Client.find();
// Si la consulta es exitosa, se envía una respuesta JSON al cliente que contiene el array clients.
        res.json(clients);
    } catch(error){
// error.message contiene el mensaje específico del error ocurrido, lo que es útil para la depuración.
        console.log("Error:", error.message);
        res.status(500).send("There was an error showing the clients.");
    }
}

// Exportar la función hace que esté disponible para ser utilizada en otras partes de mi aplicación, como en las rutas (routes)
exports.findClient = async(req, res) => {
    try{
// findById() es un método de Mongoose que busca un documento en la colección clients cuyo campo _id coincida con el valor 'req.params.id', el cuál se refiere al ID del cliente que fue pasado en la URL de la solicitud HTTP (por ejemplo, 'api/clients/:id'). El resultado de la consulta se almacena en la variable client.
        let client = await Client.findById(req.params.id);
// Aquí se verifica si client es null o undefined, lo que significa que no se encontró un cliente con el ID proporcionado.
        if(!client){
// Si no se encontró un cliente, se envía una respuesta HTTP con el código de estado 404 (no encontrado) al cliente, junto con un mensaje indicando que no se encontró el cliente.
            res.status(404).send({msg: "Client not found."});
// return se utiliza para terminar la ejecución de la función en este punto si no se encontró el cliente. Esto evita que se ejecute el código que sigue.
            return
        } else {
            res.json(client);
        }
    } catch(error){
        console.log("Error:", error.message)
        res.status(500).send("There was an error finding the client.");
    }
}

exports.modifyClient = async(req, res) => {
    try{
// El método findOneAndUpdate() de Mongoose se usa para buscar un documento en la colección clients que coincida con el _id proporcionado y actualizarlo con los datos que vienen en req.body. '_id: req.params.id' especifica que se debe buscar un cliente en la base de datos cuyo _id coincida con 'req.params.id' que es el ID del cliente que se quiere modificar y que se pasa en la URL de la solicitud HTTP. 'req.body' contiene los nuevos datos que se quieren actualizar en el cliente. Estos datos se envían en el cuerpo de la solicitud HTTP. '{new: true}' Esta opción le indica a Mongoose que debe devolver el documento actualizado después de la modificación en lugar del documento original.
        const objectClient = await Client.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        if(!objectClient){
            res.status(404).send("The Client was not found.");
        } else {
            res.json(objectClient);
        }
    } catch(error){
        console.log("Error:", error.message)
        res.status(500).send("There was an error modifying the client.")
    }
}

exports.editClient = async(req, res) => {
    try {
// El método findByIdAndUpdate() de Mongoose se utiliza para buscar un documento en la colección clients que coincida con el ID proporcionado y actualizarlo con los datos enviados en req.body
        const objectClient = await Client.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!objectClient) {
            res.status(404).send("The client doesn't exists.");
        } else {
            res.json(objectClient);
        }
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).send("There was an error editing the client.");
    }
}

exports.deleteClient = async(req, res) => {
    try{
        let objectClient = await Client.findById({_id: req.params.id});
        if(!objectClient){
            res.status(404).send("The client doesn't exists.");
        } else{
// El método findOneAndDelete() de Mongoose se usa para eliminar el cliente de la base de datos usando su ID. Este método busca y elimina un solo documento.
            await Client.findOneAndDelete({_id: req.params.id});
            res.json({msg: "The client was deleted successfully."});
        }
    } catch(error){
        console.log("Error:", error.message);
        res.status(500).send("There was an error deleting the client.");
    }
}