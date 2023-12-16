import express from 'express';
import authMiddleware from '../middlewares/auth';
import { getUser } from '../controllers/profileController';

const router = express.Router();

router.use(authMiddleware);
router.get('/', getUser);

module.exports = (app: any) => app.use('/profile', router);
