require('./models/User');
const express = require('express') // importamos express
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //Moduo para interpretar json
const authRoutes = require('./routes/authRoute');
const requireAuth = require('./middlewares/requireAuth');


const app = express(); //Creamos nuestra app
app.use(bodyParser.json());
app.use(authRoutes); //Utilizamos el router de auth routes

// Cada vez que se hace una peticion get a la ruta raiz '/' se llamara a una funcion que se llama con dos parametros
/**
 * @req Que es la reequest o peticion que se va arealizar
 * @res Que es la respuesta que va a dar dicha peticion
 */
app.get('/',requireAuth, (req, res) => {
    console.log(`Your email: ${req.user.email}`)
});
//Este string es el que nos permite conectarnos a nuestra insctancia de remota de mongoDB
const mongoUri = 'mongodb+srv://admin:admin@trainingserver.mxh3x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//Nos conectamos
mongoose.connect(mongoUri);

//Probamos la conexion
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
})
mongoose.connection.on('error', (err) => {
    console.log('Error conecting to mongo', err);
})

//Escuchamos el puerto 300 y le pasamos una funcion para saber si lo esta haciendo 
app.listen(3000, () => {
    console.log('Listening on port 3000');
});