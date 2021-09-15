import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
// const path = require('path');

//Import Routers
import homeRoutes from './routes/home.js';
import accountsRoutes from './routes/accounts.js';
import userRoutes from './routes/users.js';
import userAccountRoutes from './routes/userAccount.js';

const app = express();
dotenv.config();

//limit and extended are for excepting large files (images)
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', homeRoutes);
app.use('/accounts', accountsRoutes);
app.use('/users', userRoutes);
app.use('/userAccount', userAccountRoutes);

//http://www.mongodb.com/cloud/atlas

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.env.PWD, 'client', 'build')));


    app.get('*', (req, res) => {
        res.sendFile(path.join(process.env.PWD, 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 5000;

//Creates the connection to our database
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true}) //Removes certain errors from printing in the console
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));

//Helps with console errors
mongoose.set('useFindAndModify', false);

