const mongoose = require('mongoose');

// Aquí defino un nuevo esquema de mongoose llamado clientSchema. Un esquema es una representación estructurada de cómo se deben organizar y validar los datos en la base de datos.
const clientSchema = mongoose.Schema({
// Propiedades del esquema
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    documento: {
        type: Number,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    direccion: {
        type: String,
        required: true
    }
// versionKey: false se pasa como segundo argumento al esquema y se utiliza para evitar que mongoose cree un campo adicional '__v' en los documentos. Este campo se utiliza para almacenar la versión del documento y es útil para manejar concurrencias, pero si no es necesario, puede ser deshabilitado.
}, {versionKey: false});

// Aquí se crea un modelo de mongoose basado en el esquema clientSchema y se exporta. El modelo Client es una clase constructora que representa la colección clients en MongoDB, ya que la colección se crea en minúsculas y pluraliza el nombre del modelo.
module.exports = mongoose.model('Client', clientSchema);