import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

//Import Routers
import homeRoutes from './routes/home.js';

const app = express();
dotenv.config();

//limit and extended are for excepting large files (images)
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', homeRoutes);


//http://www.mongodb.com/cloud/atlas

const PORT = process.env.PORT || 5000;

//Creates the connection to our database
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true}) //Removes certain errors from printing in the console
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));

//Helps with console errors
mongoose.set('useFindAndModify', false);

