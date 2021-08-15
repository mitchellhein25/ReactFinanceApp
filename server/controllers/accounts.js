import mongoose from 'mongoose';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
import Account from '../models/account.js';
import AccountName from '../models/accountName.js';

export const getAccounts = async (req, res) => {
    try {
        if (!req.userId) {
            accounts = null;
            res.status(200).json(accounts);
        }
        //Asynchronous call to Account model, find gets all records
        const accounts = await Account.find({ user: req.userId });
        res.status(200).json(accounts);
    } catch (error){
        res.status(404).json({ message: error});
    }
}

export const postAccount = async (req, res) => {
    const account = req.body;

    const newAccount = new Account({ ...account, user: req.userId });

    try {
        await newAccount.save();

        //https://www.restapitutorial.com/httpstatuscodes.html
        //status codes ^
        // 201 is created
        res.status(201).json(newAccount);
    } catch (error){
        //409 is conflicts: "Conflicts are most likely to occur in response to a PUT request."
        res.status(409).json({ message: error});
    }
}

export const updateAccount = async (req, res) => {
    const { id: _id } = req.params;
    const account = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No account with that id');

    const updatedAccount = await Account.findByIdAndUpdate(_id, { ... account, _id }, { new: true });
    
    res.json(updatedAccount);
}

export const deleteAccount = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No account with that id');

    await Account.findByIdAndRemove(id);

    res.json({ message: 'Account deleted successfully' });
 }

export const getAccountNames = async (req, res) => {
    try {
        if (!req.userId) {
            accountNames = null;
            res.status(200).json(accountNames);
        }
        //Asynchronous call to AccountName model, find gets all records
        const accountNames = await AccountName.find({ user: req.userId });
        res.status(200).json(accountNames);
    } catch (error){
        res.status(404).json({ message: error });
    }
}

export const postAccountName = async (req, res) => {
    const accountName = req.body;

    const newAccountName = new AccountName({ ...accountName, user: req.userId });

    try {
        await newAccountName.save();

        //https://www.restapitutorial.com/httpstatuscodes.html
        //status codes ^
        // 201 is created
        res.status(201).json(newAccountName);
    } catch (error){
        //409 is conflicts: "Conflicts are most likely to occur in response to a PUT request."
        res.status(409).json({ message: error});
    }
}

export const updateAccountName = async (req, res) => {
    const { id: _id } = req.params;
    const accountName = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No accountName with that id');

    const updatedAccountName = await AccountName.findByIdAndUpdate(_id, { ... accountName, _id }, { new: true });
 
    res.json(updatedAccountName);
}

export const deleteAccountName = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No accountName with that id');

    await AccountName.findByIdAndRemove(id);

    res.json({ message: 'AccountName deleted successfully' });
 }