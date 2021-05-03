const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRepository = require('../Repositories/user_repository');


async function register(req, res, next) {
    try {
        const { name, email, password, repeatedPassword } = req.body;

        const schema = Joi.object({
            name: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).max(20).required(),
            repeatedPassword: Joi.string().min(5).max(20).required(),
        });

        await schema.validateAsync({ name, email, password, repeatedPassword });

        if (password !== repeatedPassword) {
            const err = new Error(
                'Password y repeatedPassword deben coincidir'
            );
            err.code = 400;
            throw err;
        }

        const user = await userRepository.findUserByEmail(email);

        if (user) {
            const err = new Error(`Ya existe un usuario con email: ${email}`);
            err.code = 409;

            throw err;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const createdUser = await userRepository.createUser({
            name,
            email,
            password: passwordHash,
        });
        res.status(201);
        res.send({
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
        });
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).max(20).required(),
        });
        await schema.validateAsync({email, password});

        const user = await userRepository.findUserByEmail(email);

        if (!user) {
            const error = new Error('El usuario no existe');
            error.code = 401;
            throw error;
        }
        //comparo la password con la que tengo guardada en la tabla (son hashs).
        const isValidPass = await bcrypt.compare(password, user.password);

          if (!isValidPass) {
              const error = new Error('El password no es válido');
              error.code = 401;

              throw error;
          }
        //Construir el jwt (json web tokens):
        const tokenPayLoad = { id: user.id }; //voy a tomar el id del usuario que viene implicito en user.id

        //Generamos el token a partir del user.id: estos son los 3 argumentos de la funcion "jwt.sign()"
         const token = jwt.sign(tokenPayLoad, process.env.SECRET, {
             expiresIn: '1d',
         });

        res.send({ id: user.id, token }); //un token es ese codigo giante
    } catch (err) {
        next(err);
    }
};



module.exports = {
    register,
    login,
};
