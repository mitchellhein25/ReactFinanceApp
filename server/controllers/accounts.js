import mongoose from 'mongoose';
import Account from '../models/account.js';
import AccountName from '../models/accountName.js';

export const getAccountsHome = async (req, res) => {
    try {
        //Asynchronous call to Account model, find gets all records
        const accounts = await Account.find();
        res.status(200).json(accounts);
    } catch (error){
        res.status(404).json({ message: error});
    }
}