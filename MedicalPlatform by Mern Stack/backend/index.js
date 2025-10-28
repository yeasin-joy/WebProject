import express from "express"
const app=express()
import cors from 'cors'
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'; 
import { dirname, join } from 'path';

import hospitalRouter from './routes/hospitalRoute.js';
import doctorRouter from './routes/doctorRoute.js'
import patientRouter from './routes/patientRoute.js'
import adminRouter from './routes/adminRoute.js'


dotenv.config();


const port = process.env.PORT || 3000;
const dbURL = process.env.mongoDBURL


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 

// middleware
app.use(express.json())
app.use(cors());

// routes
app.use('/uploads', express.static(join(__dirname, 'uploads')));
app.use('/hospital', hospitalRouter)
app.use('/doctor', doctorRouter)
app.use('/patient', patientRouter)
app.use('/admin', adminRouter)

// server running code and a root route for checking
app.get('/*', async (req, res) => {
  res.status(200).send('medical management server is up and running')
});


mongoose
    .connect(dbURL)
    .then(() => {
        console.log('Connection to DB successful')
        app.listen(port, () => {
            console.log(`medical management started on port: ${port}`);
          });
    })
    .catch((error) => {
        console.log(error)
    })