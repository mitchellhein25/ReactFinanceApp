import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Schema for an budget
const incomeCatSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String, 
    }
});

//User can't have duplicate income categories
incomeCatSchema.index({user: 1, name: 1}, {unique: true});

//Turn the schema into a model
const IncomeCat = mongoose.model('incomeCat', incomeCatSchema);

export default IncomeCat;