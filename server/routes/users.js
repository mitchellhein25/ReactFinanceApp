import express from 'express';

import { signin, signup } from '../controllers/user.js';

const router = express.Router();
process.setMaxListeners(0);

//Send user data for sign in
router.post('/signin', signin);
router.post('/signup', signup);

export default router;