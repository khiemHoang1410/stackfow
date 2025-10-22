import e from "express";
import  userController from '../controllers/user.controller.js'

const router = e.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

export default router;