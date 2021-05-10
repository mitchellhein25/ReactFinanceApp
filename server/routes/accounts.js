import express from 'express';

import { getAccountsHome } from '../controllers/accounts.js';

const router = express.Router();
process.setMaxListeners(0);

//localhost:5000/
router.get('/accounts', getAccountsHome);