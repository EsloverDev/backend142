// require es una función utilizada para cargar módulos que están disponibles en el entorno de Node.js o que han sido instalados a través de npm. Aquí estoy importando el módulo express
const express = require('express');
//Aquí importo el módulo que contiene la lógica para conectar la aplicación a la base de datos.
const connectionDb = require('../configDb/db');
//Aquí importo el módulo cors
const cors = require('cors');

// Aquí estoy creando una instancia de express. express() inicializa una nueva aplicación Express
const app = express();
// Aquí defino el puerto del servidor en el que la aplicación Express escuchará las solicitudes HTTP entrantes.
const port = process.env.PORT || 5000;
// Aquí llamo a la función connectionDb() que establece la conexión con la base de datos, esta función está importada desde el módulo db.js
connectionDb();
//Aquí aplico el middleware cors a todas las rutas de la aplicación, permitiendo que las solicitudes de recursos sean compartidas entre distintos orígenes.
app.use(cors());

// app.use() es un método de Express que se utiliza para montar middleware en la aplicación. Un middleware es una función que se ejecuta durante el ciclo de vida de una solicitud HTTP antes de que llegue al manejador final de la ruta. 'express.json()' es un middleware integrado en Express que analiza las solicitudes entrantes con formato JSON, convirtiendolas en objetos JavaScript accesibles a través de 'req.body'. Esta línea permite que la aplicación entienda y procese datos en formato JSON que se envian en el cuerpo de las solicitudes HTTP (POST, PUT, PATCH, etc.). Por ejemplo si una solicitud POST envía un cuerpo como {"nombre": "Edwin"}, este middleware convierte esta cadena JSON en un objeto JavaScript accesible como 'req.body.nombre' en las rutas.
app.use(express.json());

// Aquí también uso app.use(), pero esta vez para montar un enrutador específico en una ruta base. En esta línea se le especifica a Express que cualquier solicitud que comience con '/api/clients' debe manejarse utilizando las rutas definidas en el archivo RoutesClient.js. Esto significa que cuando alguien visita, por ejemplo, '/api/clients' con una solicitud GET, la solicitud se enruta al controlador que maneja 'showClients()' en RoutesClient.js.
app.use('/api/clients', require('../routes/RoutesClient'));
app.use('/api/products', require('../routes/RoutesProduct'));

// Aquí defino una ruta GET en la raíz del servidor ('/'). cuando un cliente accede a esta ruta, la función de devolución de llamada se ejecuta. Ésta función recibe dos objetos req = la solicitud entrante y res = la respuesta que se enviará devuelta al cliente con el mensaje que definí.
app.get('/', (req, res)=>{
    res.send("Welcome, we are on the browser");
})

//Aquí estoy iniciando el servidor para que escuche por el puerto especificado y se imprime un mensaje en la consola para indicar que el servidor está en funcionamiento y escucha por el puerto especificado.
app.listen(port, () => console.log("We are connected with the server from the port: ", port));