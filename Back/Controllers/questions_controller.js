const Joi = require('joi');

const {
    questionsRepository,
    userRepository,
    tagsRepository,
} = require('../Repositories/index');

const { findUserByQuestionId } = require('../Repositories/users_repository');

async function createQuestion(req, res, next) {
    try {
        const { id } = req.auth;
        let { title, body, tags } = req.body;

        const schema = Joi.object({
            title: Joi.string().max(50).required(),
            body: Joi.string().max(2500).required(),
            tags: Joi.array(),
        });

        await schema.validateAsync({ title, body, tags });

        const resp = await questionsRepository.addQuestion(title, body, id);
        // Recorremos el array de tags si existe
        // Si el tag existe en la tabla tags metemos la asociación en la tabla question_tags
        // Si el tag no existe en la tabla tags lo creamos y metemos la asociación

        if (tags) {
            for (const tag of tags) {
                let id_tag;
                //Miramos si ya existe el tag en la tabla
                let dbTag = await tagsRepository.findTag(tag);

                if (!dbTag) {
                    // Si no existe lo creamos
                    id_tag = await tagsRepository.createTag(tag);
                } else {
                    // Si existe cogemos su id
                    id_tag = dbTag.id_tag;
                }

                // Añadimos la asociación en la tabla question_tags
                await questionsRepository.addTagToQuestion(
                    resp.id_question,
                    id_tag
                );
            }
        }
        const question = await questionsRepository.findQuestionById(
            resp.id_question
        );
        res.status(201);
        res.send({ question });
    } catch (err) {
        next(err);
    }
}
async function getQuestionById(req, res, next) {
    try {
        const { id_question } = req.params;
        const question = await questionsRepository.findQuestionById(
            id_question
        );

        if (!question) {
            const error = new Error('Pregunta no existe');
            error.code = 404;
            throw error;
        }

        const user = await userRepository.findUserById(question.id_user);

        res.send({
            id_question: question.id_question,
            title: question.title,
            body: question.body,
            date: question.creation_date,
            tags: question.tags,
            user: user.name_user,
            id_user: question.id_user,
            status: question.status_enum,
            id_answer_acepted: question.id_answer_acepted,
        });
    } catch (err) {
        next(err);
    }
}
async function getQuestionsByUserId(req, res, next) {
    try {
        const { id_user } = req.params;
        const question = await questionsRepository.findQuestionByUserId(
            id_user
        );
        if (!question) {
            console.log('Usuario no ha realizado ninguna pregunta');
        }
        res.send({ question });
    } catch (err) {
        next(err);
    }
}

async function getQuestions(req, res, next) {
    try {
        const { words } = req.params;
        const wordsSplit = words.split(' ');

        let questionTags = await questionsRepository.findQuestionsByTag(
            wordsSplit
        );

        let questionTitles = await questionsRepository.findQuestionByTitle(
            wordsSplit.join('|')
        );

        let questions = [...questionTags, ...questionTitles];

        let hash = {};
        questions = questions.filter((o) =>
            hash[o.id_question] ? false : (hash[o.id_question] = true)
        );

        res.send({
            questions,
        });
    } catch (err) {
        next(err);
    }
}

// async function getRandomQuestions(req,res, next){
//   const arrayOfId = [1, 3, 5, 8, 9];
//   SELECT * FROM questions WHERE id_question IN (${arrayOfId});
//   Devuelve todas las preguntas con esos id
//   Esto nos va a servir para encontrar preguntas random e imrpimir por pantalla.

// }

async function acceptAnswer(req, res, next) {
    try {
        const { rol, id } = req.auth;
        const { id_question } = req.params;
        const { id_answer } = req.body;
        const userId = await findUserByQuestionId(id_question);

        if (userId.id_user !== id && rol !== 'admin') {
            const error = new Error(
                'Acceso denegado, debes ser el titular de la pregunta para poder aceptar respuestas'
            );
            error.code = 401;
            throw error;
        }
        await questionsRepository.closeQuestion(id_question, id_answer);

        res.status(201);
        res.send('Pregunta cerrada');
    } catch (err) {
        next(err);
    }
}
async function closeQuestionByAdmin(req, res, next) {
    try {
        const { rol, id } = req.auth;
        const { id_question } = req.params;
        const userId = await findUserByQuestionId(id_question);
        if (userId.id_user !== id && rol !== 'admin') {
            const error = new Error(
                'Acceso denegado, debes ser el titular de la pregunta para poder aceptar respuestas'
            );
            error.code = 401;
            throw error;
        }
        await questionsRepository.chiudiQuestionByAdmin(id_question);

        res.status(201);
        res.send({ message: 'Pregunta cerrada' });
    } catch (err) {
        next(err);
    }
}
async function removeQuestion(req, res, next) {
    try {
        const { id_question } = req.params;
        const { rol, id } = req.auth;
        const userId = await questionsRepository.findUserByQuestionId(
            id_question
        );
        if (userId !== id && rol !== 'admin') {
            const error = new Error('Acceso denegado');
            error.code = 401;
            throw error;
        }

        await questionsRepository.deleteQuestionById(id_question);

        res.status(201);
        res.send('pregunta borrada');
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createQuestion,
    getQuestionById,
    getQuestionsByUserId,
    acceptAnswer,
    closeQuestionByAdmin,
    removeQuestion,
    getQuestions,
};
