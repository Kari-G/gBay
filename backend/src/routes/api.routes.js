import express from 'express';
const cors = require('cors');
import { loginController, registerController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', registerController.post);
router.post('/login', loginController.post);

export default router;
