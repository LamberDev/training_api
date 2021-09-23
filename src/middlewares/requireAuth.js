const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    // authorization === Bearer laldkjladk
    if(!authorization) {
        return res.status(401).send({ errror: 'You must be logged in.' });
    }

    const token = authorization.replace('Bearer ', ''); //Quitamos el Bearer del header para quedarnos solo con el token
    /**
     * Verificamos que exitsa el token pasandole el token y la nuestra clave secreta de 256 bits
     * esto nos devuelve una funcion en la que queremos saber si hay algun error y en el caso de que este bien nos devolvera la informacion que guarda ese token
     * En el @payload
     */
    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        if(err) {
            return res.status(401).send({ error: 'You must be logged in.' });
        }

        const { userId } = payload;

        const user = await User.findById(userId);

        req.user = user; //Le asignamos el usuario con token a la request que queramos hacer

        next(); //Pasamos el next step
    })
}