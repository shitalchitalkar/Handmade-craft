const express = require('express');
const app =express();
const mongoose = require('mongoose');
const mainRoutes = require('./routes/mainRoutes');
const authRoutes = require ('./routes/authRoutes');
    const cors = require("cors");
//app.use(cors({ origin: "http://localhost:3000" }));

app.use(cors({origin:"http://localhost:3002", methods:["GET","POST","PUT","DELETE"],Credential:true,}));


app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/testdb')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use('/api', mainRoutes);
app.use('/api',authRoutes);

// PORT set 
const PORT = process.env.PORT || 5000;

// Server start 
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:'+PORT);
});