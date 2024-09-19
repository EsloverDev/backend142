// Aquí importo el módulo express
const express = require('express');
// express.Router() es una función que crea un nuevo objeto de enrutador (router). Este enrutador se utiliza para definir rutas y controlar las solicitudes HTTP entrantes.
const router = express.Router();
// Aquí importo el archivo ClientController que contiene las funciones que gestionan las operaciones relacionadas con los clientes, como agregar, mostrar, buscar, modificar y eliminar clientes.
const clientController = require('../controllers/ClientController');

// Aquí se define una ruta para manejar las solicitudes HTTP POST en la ruta raíz '/' (de este enrutador). Cuando se realiza una solicitud POST a esta ruta, se ejecuta la función addClient() del controlador clientController, que maneja la lógica para agregar un nuevo cliente a la base de datos.
router.post('/', clientController.addClient);

// Esta ruta maneja las solicitudes GET en la ruta raíz '/'. Cuando se realiza una solicitud GET a esta ruta, se ejecuta la función showClients() del controlador, la cual se encarga de mostrar todos los clientes almacenados en la base de datos.
router.get('/', clientController.showClients);

// Aquí se define una ruta para manejar las solicitudes GET a la ruta '/:id', donde :id es un parámetro de la URL que representa el ID de un cliente específico. Cuando se realiza la solicitud, se ejecuta la función findClient() del controlador que se encarga de buscar y devolver un cliente específico en la base de datos usando el ID proporcionado.
router.get('/:id', clientController.findClient);

// Aquí se define una ruta para manejar las solicitudes PUT a la ruta '/:id', ejecutando la función modifyClient() del controlador, la cual permite actualizar completamente un recurso (en este caso un cliente) en la base de datos usando su ID.
//router.put('/:id', clientController.modifyClient);

// Aquí se define una ruta para manejar las solicitudes PATCH a la ruta '/:id', ejecutando la función editClient() del controlador, la cual permite modificar parcialmente los datos de un cliente específico en la base de datos usando su ID.
router.patch('/:id', clientController.editClient);

// Aquí se define una ruta para manejar las solicitudes DELETE a la ruta '/:id' ejecutando la función deleteClient() del controlador, que se encarga de eliminar un cliente específico de la base de datos usando el ID proporcionado.
router.delete('/:id', clientController.deleteClient);

// Aquí estoy exportando el objeto router el cual se importa en el archivo principal de la aplicación donde se integra con la aplicación Express para manejar las rutas definidas aquí.
module.exports = router;