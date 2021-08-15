import mongoose from 'mongoose';

//Schema for an budget
const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    id: { 
        type: String 
    }
});

//Turn the schema into a model
const User = mongoose.model('user', userSchema);

export default User;