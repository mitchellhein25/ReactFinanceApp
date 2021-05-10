import mongoose from 'mongoose';

const Schema = mongoose.Schema;

//Schema for an account
const accountSchema = mongoose.Schema({
    date: Date,
    name: {
        type: Schema.Types.ObjectId,
        ref: "AccountName",
    },
    balance: Number,
    debtOrAsset: Boolean
});

//Turn the schema into a model
const Account = mongoose.model('account', accountSchema);

export default Account;