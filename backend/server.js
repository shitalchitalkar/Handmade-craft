import express from 'express';
import mongoose from 'mongoose';
import mainRoutes from './routes/mainRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(cors({
  origin:"http://localhost:5173",
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/testdb')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use('/api', mainRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:'+PORT);
});