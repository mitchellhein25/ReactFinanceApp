import mongoose from 'mongoose';
import Expense from '../models/expense.js';
import Income from '../models/income.js';
import Budget from '../models/budget.js';
import IncomeCat from '../models/incomecat.js';

export const getExpensesHome = async (req, res) => {
    try {
        if (!req.userId) {
            expenses = null;
            res.status(200).json(expenses);
        }

        //Asynchronous call to Expense model, find gets all records
        const expenses = await Expense.find({ user: req.userId });
    
        res.status(200).json(expenses);
    } catch (error){
        res.status(404).json({ message: error});
    }
}

export const postExpenseHome = async (req, res) => {
    const expense = req.body;

    const newExpense = new Expense({ ...expense, user: req.userId });
    // console.log(newExpense);
    try {
        await newExpense.save();

        //https://www.restapitutorial.com/httpstatuscodes.html
        //status codes ^
        // 201 is created
        res.status(201).json(newExpense);
    } catch (error){
        //409 is conflicts: "Conflicts are most likely to occur in response to a PUT request."
        res.status(409).json({ message: error});
    }
}

export const updateExpenseHome = async (req, res) => {
    const { id: _id } = req.params;
    const expense = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No expense with that id');

    const updatedExpense = await Expense.findByIdAndUpdate(_id, { ... expense, _id }, { new: true });
 
    res.json(updatedExpense);
}

export const deleteExpenseHome = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No expense with that id');

    await Expense.findByIdAndRemove(id);

    res.json({ message: 'Expense deleted successfully' });
 }

 export const getIncomesHome = async (req, res) => {
    try {
        if (!req.userId) {
            incomes = null;
            res.status(200).json(incomes);
        }
        //Asynchronous call to Income model, find gets all records
        const incomes = await Income.find({ user: req.userId });
        // console.log("INCOMES: ", incomes);
        res.status(200).json(incomes);
    } catch (error){
        res.status(404).json({ message: error});
    }
}

export const postIncomeHome = async (req, res) => {
    const income = req.body;

    const newIncome = new Income({ ...income, user: req.userId });

    try {
        await newIncome.save();

        //https://www.restapitutorial.com/httpstatuscodes.html
        //status codes ^
        // 201 is created
        res.status(201).json(newIncome);
    } catch (error){
        //409 is conflicts: "Conflicts are most likely to occur in response to a PUT request."
        res.status(409).json({ message: error});
    }
}

export const updateIncomeHome = async (req, res) => {
    const { id: _id } = req.params;
    const income = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No income with that id');

    const updatedIncome = await Income.findByIdAndUpdate(_id, { ... income, _id }, { new: true });
 
    res.json(updatedIncome);
}

export const deleteIncomeHome = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No income with that id');

    await Income.findByIdAndRemove(id);

    res.json({ message: 'Income deleted successfully' });
 }

 export const getBudgetsHome = async (req, res) => {
    try {
        if (!req.userId) {
            budgets = null;
            res.status(200).json(budgets);
        }
        //Asynchronous call to Budget model, find gets all records
        const budgets = await Budget.find({ user: req.userId });
        res.status(200).json(budgets);
    } catch (error){
        res.status(404).json({ message: error});
    }
}

export const postBudgetHome = async (req, res) => {
    const budget = req.body;
    // console.log(budget);
    const newBudget = new Budget({ ...budget, user: req.userId });
    // console.log(newBudget);
    try {
        await newBudget.save();

        //https://www.restapitutorial.com/httpstatuscodes.html
        //status codes ^
        // 201 is created
        res.status(201).json(newBudget);
    } catch (error){
        //409 is conflicts: "Conflicts are most likely to occur in response to a PUT request."
        res.status(409).json({ message: error});
    }
}

export const updateBudgetHome = async (req, res) => {
    const { id: _id } = req.params;
    const budget = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No budget with that id');

    const updatedBudget = await Budget.findByIdAndUpdate(_id, { ...budget, _id }, { new: true });
 
    res.json(updatedBudget);
}

export const deleteBudgetHome = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No budget with that id');

    await Budget.findByIdAndRemove(id);

    res.json({ message: 'Budget deleted successfully' });
 }

 export const getBudgetById = async (req, res) => {
     const { id } = req.params;

     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No budget with that id');

    const budget = await Budget.findById(id);

    res.json(budget);
 }

 export const getBudgetByName = async (req, res) => {
    const { name } = req.params;

   const budget = await Budget.find({name: name}).catch(error => console.log(error));

   res.json(budget);
}

export const getIncomeCatsHome = async (req, res) => {
    try {
        if (!req.userId) {
            incomeCats = null;
            res.status(200).json(incomeCats);
        }

        //Asynchronous call to Budget model, find gets all records
        const incomeCats = await IncomeCat.find({ user: req.userId });
        // console.log("incomeCats: ", incomeCats);
        res.status(200).json(incomeCats);
    } catch (error){
        res.status(404).json({ message: error});
    }
}

export const postIncomeCatHome = async (req, res) => {
    const incomeCat = req.body;

    const newIncomeCat = new IncomeCat({ ...incomeCat, user: req.userId });

    try {
        await newIncomeCat.save();

        //https://www.restapitutorial.com/httpstatuscodes.html
        //status codes ^
        // 201 is created
        res.status(201).json(newIncomeCat);
    } catch (error){
        //409 is conflicts: "Conflicts are most likely to occur in response to a PUT request."
        res.status(409).json({ message: error});
    }
}

export const updateIncomeCatHome = async (req, res) => {
    const { id: _id } = req.params;
    const incomeCat = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No incomeCat with that id');

    const updatedIncomeCat = await IncomeCat.findByIdAndUpdate(_id, { ...incomeCat, _id }, { new: true });
 
    res.json(updatedIncomeCat);
}

export const deleteIncomeCatHome = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No incomeCat with that id');

    await IncomeCat.findByIdAndRemove(id);

    res.json({ message: 'Income Category deleted successfully' });
 }

 export const getGroupedExpenses = async (req, res) => {
    try {
        if (!req.userId) {
            groupedExpenses = null;
            res.status(200).json(groupedExpenses);
        }

        //Asynchronous call to Expense model, find gets all records
        const groupedExpenses = await Expense.aggregate([
            { user: req.userId, $group : { _id : '$category', amount : { $sum : '$amount' } } }
        ])
        // console.log("EXPENSES: ", expenses);
        // const expenses = await Expense.find();

        res.status(200).json(groupedExpenses);
    } catch (error){
        res.status(404).json({ message: error});
    }
}