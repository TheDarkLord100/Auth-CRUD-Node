const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');

mongoose.connect(process.env.MONGO_URL)
.then(() => {  console.log("Connected to MongoDB");})
.catch((err) => { console.log(err); });

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', require('./routes/authRoute'));
app.use('/property', require('./routes/propertyRoute'));

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

