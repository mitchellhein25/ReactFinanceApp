import mongoose from 'mongoose';

//Schema for an budget
const accountNameSchema = mongoose.Schema({
    name: {
        type: String, 
        unique: true
    }
});

//Turn the schema into a model
const AccountName = mongoose.model('accountName', accountNameSchema);

export default AccountName;