import express from 'express';
import authMiddleware from '../middlewares/auth';
import User from '../models/user';

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (request: any, response: any) => {
    const user = await User.findById(request.userId);

    if (!user) {
        return response.status(400).send({ error: 'Usuário não encontrado' });
    }
    response.send({ user: user.name });
});

module.exports = (app: any) => app.use('/projects', router);
