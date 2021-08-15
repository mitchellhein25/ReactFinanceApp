import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Schema for an income
const incomeSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    date: Date,
    category: String, 
    amount: Number,
    description: String,
});

//Turn the schema into a model
const Income = mongoose.model('income', incomeSchema);

export default Income;