import mongoose from 'mongoose';

//Schema for an budget
const budgetSchema = mongoose.Schema({
    name: {
        type: String, 
        unique: true
    },
    amount: Number,
});

//Turn the schema into a model
const Budget = mongoose.model('budget', budgetSchema);

export default Budget;