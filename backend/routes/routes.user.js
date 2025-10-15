import e from "express";
import registerUser from '../controllers/user.controller.js'

const router = e.Router();

router.post('/register', registerUser);

export default router;