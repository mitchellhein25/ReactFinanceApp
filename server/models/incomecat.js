import mongoose from 'mongoose';

//Schema for an budget
const incomeCatSchema = mongoose.Schema({
    name: {
        type: String, 
        unique: true
    }
});

//Turn the schema into a model
const IncomeCat = mongoose.model('incomeCat', incomeCatSchema);

export default IncomeCat;