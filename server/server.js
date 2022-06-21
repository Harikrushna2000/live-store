const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
var corsOptions = {
    origin: "http://localhost:4200"
};
app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads'));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/live-store");

const users = require('./app/routes/product');
const category = require('./app/routes/category');
app.use('/api', users);
app.use('/api', category);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
