import express from 'express';
import {
  register,
  login,
  resgisterAdmin,
  loginAdmin,
  forgotPassword,
  resetPassword,
} from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/register-admin', resgisterAdmin);
router.post('/login-admin', loginAdmin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = (app: any) => app.use('/auth', router);
