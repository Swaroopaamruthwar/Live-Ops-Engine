const express = require('express');
const mongoose = require('mongoose');
const offer = require('./routes/offer');
const app = express();
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/live-ops-engine').then(() => console.log("connected db ")).catch(() => console.log("error occured while connecting to db"))
app.use("", offer)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));