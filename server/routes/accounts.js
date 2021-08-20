import express from 'express';

import { getAccounts, postAccount, updateAccount, deleteAccount } from '../controllers/accounts.js';
import { getAccountNames, postAccountName, updateAccountName, deleteAccountName } from '../controllers/accounts.js';

import auth from '../middleware/auth.js';

const router = express.Router();
process.setMaxListeners(0);

//localhost:5000/accounts
router.get('/accounts', auth, getAccounts);
router.post('/account', auth, postAccount);
router.patch('/account:id', auth, updateAccount);
router.delete('/account:id', auth, deleteAccount);
router.get('/accountNames', auth, getAccountNames);
router.post('/accountName', auth, postAccountName);
router.patch('/daccountName:id', auth, updateAccountName);
router.delete('/daccountname:id', auth, deleteAccountName);

export default router;