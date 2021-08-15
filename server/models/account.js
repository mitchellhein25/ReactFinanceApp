import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Schema for an account
const accountSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    date: Date,
    name: {
        type: Schema.Types.ObjectId,
        ref: "AccountName",
    },
    balance: Number,
    debtOrAsset: Boolean,
    allocation: {
        type: Number,
        min: 0,
        max: 100
    }
});

//Turn the schema into a model
const Account = mongoose.model('account', accountSchema);

export default Account;