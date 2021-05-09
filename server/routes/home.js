import express from 'express';

import { getExpensesHome, postExpenseHome, updateExpenseHome, deleteExpenseHome, getGroupedExpenses  } from '../controllers/home.js';
import { getIncomesHome, postIncomeHome, updateIncomeHome, deleteIncomeHome,  } from '../controllers/home.js';
import { getBudgetsHome, postBudgetHome, updateBudgetHome, deleteBudgetHome,  } from '../controllers/home.js';
import { getIncomeCatsHome, postIncomeCatHome, updateIncomeCatHome, deleteIncomeCatHome,  } from '../controllers/home.js';

const router = express.Router();
process.setMaxListeners(0);

//localhost:5000/
router.get('/expenses', getExpensesHome);
router.get('/groupedexpenses', getGroupedExpenses);
router.post('/expense', postExpenseHome);
router.patch('/expense:id', updateExpenseHome);
router.delete('/expense:id', deleteExpenseHome);
router.get('/incomes', getIncomesHome);
router.post('/income', postIncomeHome);
router.patch('/income:id', updateIncomeHome);
router.delete('/income:id', deleteIncomeHome);
router.get('/budgets', getBudgetsHome);
router.post('/budget', postBudgetHome);
router.patch('/budget:id', updateBudgetHome);
router.delete('/budget:id', deleteBudgetHome);
router.get('/incomecats', getIncomeCatsHome);
router.post('/incomecat', postIncomeCatHome);
router.patch('/incomecat:id', updateIncomeCatHome);
router.delete('/incomecat:id', deleteIncomeCatHome);

export default router;