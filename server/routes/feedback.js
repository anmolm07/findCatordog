const express= require('express');
const axios=require('axios');

const router=express.Router();

const {feedbackresponse}=require('../controllers/feedbackcontrol');
router.post("/api/feedback",feedbackresponse);

module.exports=router;