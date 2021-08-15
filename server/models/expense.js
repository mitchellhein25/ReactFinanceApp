import mongoose from 'mongoose';

const Schema = mongoose.Schema;

//Schema for an expense
const expenseSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    date: Date,
    category: {
        type: Schema.Types.ObjectId,
        ref: "Budget",
    },
    amount: Number,
    description: String
});

//Turn the schema into a model
const Expense = mongoose.model('expense', expenseSchema);

export default Expense;