import mongoose from 'mongoose';

const Schema = mongoose.Schema;

//Schema for an expense
const expenseSchema = mongoose.Schema({
    date: Date,
    category: {
        type: Schema.Types.ObjectId,
        ref: "Budget",
    },
    amount: Number,
});

//Turn the schema into a model
const Expense = mongoose.model('expense', expenseSchema);

export default Expense;