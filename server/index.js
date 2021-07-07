const express= require('express');
const bodyParser= require('body-parser');
const morgan= require('morgan');
const cors=require('cors');
const axios=require('axios');

const feedbackRoute=require('./routes/feedback');

const app=express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/',feedbackRoute);

app.listen(process.env.PORT || 8000);