import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Schema for an budget
const budgetSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
    },
    amount: Number,
});

//User can't have duplicate budget names
budgetSchema.index({user: 1, name: 1}, {unique: true});

//Turn the schema into a model
const Budget = mongoose.model('budget', budgetSchema);

export default Budget;