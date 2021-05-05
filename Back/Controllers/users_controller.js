const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRepository = require('../Repositories/users_repository');

async function register(req, res, next) {
    try {
        const { name_user, email, password_user, repeatedPassword } = req.body;

        const schema = Joi.object({
            name_user: Joi.string(),
            email: Joi.string().email().required(),
            password_user: Joi.string().min(5).max(20).required(),
            repeatedPassword: Joi.string().min(5).max(20).required(),
        });

        await schema.validateAsync({
            name_user,
            email,
            password_user,
            repeatedPassword,
        });

        if (password_user !== repeatedPassword) {
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

        const passwordHash = await bcrypt.hash(password_user, 10);

        const createdUser = await userRepository.createUser({
            name_user,
            email,
            password_user: passwordHash,
        });
        res.status(201);
        res.send({
            id: createdUser.id_user,
            name: createdUser.name_user,
            email: createdUser.email,
            password: createdUser.password_user,
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
        await schema.validateAsync({ email, password });

        const user = await userRepository.findUserByEmail(email);

        if (!user) {
            const error = new Error('El usuario no existe');
            error.code = 401;
            throw error;
        }
        //comparo la password con la que tengo guardada en la tabla (son hashs).
        const isValidPass = await bcrypt.compare(password, user.password_user);

        if (!isValidPass) {
            const error = new Error('El password no es válido');
            error.code = 401;

            throw error;
        }
        //Construir el jwt (json web tokens):
        const tokenPayLoad = { id: user.id_user, rol: user.rol }; //voy a tomar el id del usuario y el rol que vienen implicito en user

        //Generamos el token a partir del user.id: estos son los 3 argumentos de la funcion "jwt.sign()"
        const token = jwt.sign(tokenPayLoad, process.env.SECRET, {
            expiresIn: '30d',
        });

        res.send({
            id: user.id_user,
            name: user.name_user,
            rol: user.rol,
            token,
        }); //un token es ese codigo giante
    } catch (err) {
        next(err);
    }
}

async function getUserById(req, res, next) {
    try {
        const { id_user } = req.params;

        // const userLogged = await userRepository.findUserById(id);

        const user = await userRepository.findUserById(id_user);

        if (!user) {
            const error = new Error('Usuario ya no Existe');

            error.code = 404;

            throw error;
        }

        res.send({
            id: user.id_user,
            name: user.name_user,
            email: user.email,
        });
    } catch (err) {
        next(err);
    }
}

async function updateUser(req, res, next) {
    try {
        const { id } = req.auth;
        const { name_user, show_mail } = req.body;
        if (!id) {
            const error = new Error('Usuario ya no Existe');
            error.code = 404;
            throw error;
        }
        if (!name_user || !show_mail) {
            const error = new Error('Todos los campos son requeridos');
            error.code = 401;
            throw error;
        }
        if (show_mail !== 'true' && show_mail !== 'false') {
            const error = new Error('Valores permitidos true o false');
            error.code = 401;
            throw error;
        }

        //No deberíamos bajo ningún punto de vista permitir cambiar el email y password con tanta facilidad.
        //ya que el email podría corresponderse con el de otro usuario y se crearían incidencias en la tabla con mismos emails.

        const schema = Joi.object({
            name_user: Joi.string().required(),
            show_mail: Joi.string(),
        });

        schema.validateAsync({
            name_user,
            show_mail,
        });

        const user = await userRepository.changeUserData(
            id,
            name_user,
            show_mail
        );
        res.status = 201;
        res.send({
            id: user.id_user,
            name: user.name_user,
            email: user.email,
            show_mail: user.show_mail,
        });
    } catch (err) {
        next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        const { rol } = req.auth;
        const { id_user } = req.params;

        if (rol !== 'admin') {
            const error = new Error('Solo admins pueden borrar usuarios');
            error.status = 403;
            throw error;
        }

        const user = await userRepository.findUserById(id_user);

        if (!user) {
            const error = new Error('El usuario no existe');
            error.status = 404;
            throw error;
        }
        await userRepository.deleteUserByid(id_user);

        res.status(204);
        res.send({ message: 'Usuario Eliminado' });

    } catch (err) {
        next(err);
    }
}

async function validateUser(req, res, next) {
    try {
        // leer datos del req.body
        // hacer el get del usuario por id
        // validar el token
        // y confirmar la cuenta
        // devolver una respuesta en función de la validación
        // UPDATE users SET isVerify = "true" WHERE id_user = 1;
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register,
    login,
    getUserById,
    updateUser,
    deleteUser,
};
