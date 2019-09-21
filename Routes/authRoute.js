import express from 'express';
import AuthController from '../Controller/AuthController';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/signup', AuthController.signUpUser);

export default router;