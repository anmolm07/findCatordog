const axios = require('axios');

exports.feedbackresponse = (req,response)=>{
    const {uploadedFiles,uploadPhotosButtonText}=req.body.data;
    axios.post(`https://dogcat-kanak.herokuapp.com/classify_image_url`, {
        url: uploadedFiles[0].secure_url
    }).then(
        function(res) {
            response.send(res.data);
        }
    ).catch(error=>{
        console.log(error);
    })
};