import mongoose from 'mongoose';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const updateName = async (req, res) => {
    const { id: _id } = req.params;
    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id');

    const updatedName = await User.findByIdAndUpdate(_id, { ... user.result }, { new: true });
    
    res.json(updatedName);
}

export const updateEmail = async (req, res) => {
    const { id: _id } = req.params;
    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No account with that id');

    try {
        //Asynchronous call to User model, find gets all records
        const existingUser = await User.findOne({email: user.result.email});
        if (existingUser) return res.status(404).json({ message: "A user with that email already exists." });

        const updatedEmail = await User.findByIdAndUpdate(_id, { ... user.result }, { new: true });
    
        res.json(updatedEmail);
        } catch (error){
            res.status(500).json({ message: "Something went wrong." });
    }

    
}