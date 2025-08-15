const express = require('express');
const mongoose = require('mongoose');
const mainRoutes = require('./routes/mainRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/testdb')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use('/api', mainRoutes);

// PORT set 
const PORT = process.env.PORT || 5000;

// Server start 
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:'+PORT);
});