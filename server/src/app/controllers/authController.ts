import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import mailer from '../../utils/mailer';
const authConfig = require('../../config/auth.json');

import User from '../models/user';
import Admin from '../models/admin';

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (request, response) => {
    const { email } = request.body;

    try {
        if (await User.findOne({ email })) {
            return response.status(400).send({ error: 'Email já cadastrado' });
        }

        const user = await User.create(request.body);

        const { password, ...userWithoutPassword } = user.toObject();

        return response.status(200).send({
            user: userWithoutPassword,
            token: generateToken({ id: user.id }),
        });
    } catch (err) {
        return response.status(400).send({ error: 'Falha no resgistro' });
    }
});

router.post('/login', async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return response.status(400).send({ error: 'Usuário não encontrado' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return response.status(400).send({ error: 'Senha inválida' });
    }

    const { password: passwordHash, ...userWithoutPassword } = user.toObject();

    response.send({
        userWithoutPassword,
        token: generateToken({ id: user.id }),
    });
});

router.post('/register-admin', async (request, response) => {
    try {
        const admin = await Admin.create(request.body);

        const { password, ...adminWithoutPassword } = admin.toObject();

        return response.status(200).send({
            username: adminWithoutPassword,
            token: generateToken({ id: admin.id }),
        });
    } catch (err) {
        return response.status(400).send({ error: 'Falha' });
    }
});

router.post('/login-admin', async (request, response) => {
    const { username, password } = request.body;

    const admin = await Admin.findOne({ username }).select('+password');

    if (!admin) {
        return response
            .status(400)
            .send({ error: 'Admin não cadastrado no sistema' });
    }

    if (!(await bcrypt.compare(password, admin.password))) {
        return response.status(400).send({ error: 'Senha inválida' });
    }

    const { password: passwordHash, ...adminWithoutPassword } =
        admin.toObject();

    response.send({
        adminWithoutPassword,
        token: generateToken({ id: admin.id }),
    });
});

router.post('/forgot-password', async (request, response) => {
    const { email } = request.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return response
                .status(400)
                .send({ error: 'Usuário não encontrado' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            $set: {
                passwordResetToken: token,
                passwordResetExpires: now,
            },
        });

        const authMailer = {
            to: email,
            from: 'lucax2776@gmail.com',
            template: 'auth/forgot-password',
            context: { token },
        };
        mailer.sendMail(authMailer, err => {
            if (err) {
                return response.status(400).send({
                    error: 'Não foi possível enviar o email de recuperação',
                });
            }

            return response.send(200);
        });
    } catch (err) {
        response.status(400).send({ error: 'Erro ao recuperar senha' });
    }
});

router.post('/reset-password', async (request, response) => {
    const { email, token, password } = request.body;

    try {
        const user = await User.findOne({ email }).select(
            '+passwordResetToken passwordResetExpires',
        );

        if (!user) {
            return response.status(400).send('Usuário não encontrado');
        }

        if (token !== user.passwordResetToken) {
            return response.status(400).send({ error: 'Token inválido' });
        }

        const now = new Date();
        if (now > user.passwordResetExpires) {
            return response.status(400).send({ error: 'Token expirado' });
        }

        user.password = password;
        await user.save();
    } catch (err) {
        return response
            .status(400)
            .send({ error: 'Não foi possivel resetar a senha' });
    }
    return response.status(200).send('Senha alterada com sucesso');
});

module.exports = (app: any) => app.use('/auth', router);
