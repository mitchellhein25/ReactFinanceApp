import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Schema for an budget
const accountNameSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String, 
    },
    allocation: {
        type: Number,
        min: 0,
        max: 100
    }
});

//User can't have duplicate account names
accountNameSchema.index({user: 1, name: 1}, {unique: true});

//Turn the schema into a model
const AccountName = mongoose.model('accountName', accountNameSchema);

export default AccountName;