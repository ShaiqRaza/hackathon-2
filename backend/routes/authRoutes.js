import express from 'express';
const router = express.Router();
import { loginUser, logoutUser, isLoggedIn, registerUser } from '../controllers/authController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/status', isLoggedIn);//to identify is the user loggedin or not

export default router;