import express from 'express';

import { getExpensesHome, postExpenseHome, updateExpenseHome, deleteExpenseHome, getGroupedExpenses  } from '../controllers/home.js';
import { getIncomesHome, postIncomeHome, updateIncomeHome, deleteIncomeHome,  } from '../controllers/home.js';
import { getBudgetsHome, postBudgetHome, updateBudgetHome, deleteBudgetHome,  } from '../controllers/home.js';
import { getIncomeCatsHome, postIncomeCatHome, updateIncomeCatHome, deleteIncomeCatHome,  } from '../controllers/home.js';

import auth from '../middleware/auth.js';

const router = express.Router();
process.setMaxListeners(0);

//localhost:5000/
router.get('/expenses', auth, getExpensesHome);
router.get('/groupedexpenses', auth, getGroupedExpenses);
router.post('/expense', auth, postExpenseHome);
router.patch('/expense:id', auth, updateExpenseHome);
router.delete('/expense:id', auth, deleteExpenseHome);
router.get('/incomes', auth, getIncomesHome);
router.post('/income', auth, postIncomeHome);
router.patch('/income:id', auth, updateIncomeHome);
router.delete('/income:id', auth, deleteIncomeHome);
router.get('/budgets', auth, getBudgetsHome);
router.post('/budget', auth, postBudgetHome);
router.patch('/budget:id', auth, updateBudgetHome);
router.delete('/budget:id', auth, deleteBudgetHome);
router.get('/incomecats', auth, getIncomeCatsHome);
router.post('/incomecat', auth, postIncomeCatHome);
router.patch('/incomecat:id', auth, updateIncomeCatHome);
router.delete('/incomecat:id', auth, deleteIncomeCatHome);

export default router;