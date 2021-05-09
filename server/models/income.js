import mongoose from 'mongoose';

//Schema for an income
const incomeSchema = mongoose.Schema({
    date: Date,
    category: String, 
    amount: Number,
});

//Turn the schema into a model
const Income = mongoose.model('income', incomeSchema);

export default Income;