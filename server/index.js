import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config({path: "../.env"});

import postRoutes from './routes/posts.js';

const app = express();

app.use('/posts', postRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD= process.env.DB_PASSWORD;


const CONNECTION_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.pcrqq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
