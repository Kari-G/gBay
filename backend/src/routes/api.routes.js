import express from 'express';
const cors = require('cors');
import { registerController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', registerController.post);

export default router;
