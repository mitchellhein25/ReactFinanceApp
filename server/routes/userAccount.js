import express from 'express';

import { updateName, updateEmail } from '../controllers/userAccount.js';

const router = express.Router();
process.setMaxListeners(0);

router.patch('/updateName:id', updateName);
router.patch('/updateEmail:id', updateEmail);

export default router;