import React,{ useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import dogphoto from './dog.jpg';

const Feedback = () => {

    // setting initial state values
    const [values, setValues] = useState({
        buttonText:'Submit',
        uploadedFiles: [],
        uploadPhotosButtonText: 'Upload files'
    });

    // destructing variables
    const { uploadedFiles, uploadPhotosButtonText, buttonText} = values;
    const { REACT_APP_API, REACT_APP_CLOUDINARY_CLOUD_NAME, REACT_APP_CLOUDINARY_UPLOAD_SECRET } = process.env;


    //function to set values to original values
    const set=()=>{
        setValues({
            ...values,
            buttonText:'Submit',
            uploadedFiles: [],
            uploadPhotosButtonText: 'Upload files'

        });

    }
    //upload photos function
    const uploadWidget = () => {
        window.cloudinary.openUploadWidget(
            {
                cloud_name: REACT_APP_CLOUDINARY_CLOUD_NAME,
                upload_preset: REACT_APP_CLOUDINARY_UPLOAD_SECRET,
                tags: ['ebooks']
            },
            function(error, result) {
                setValues({
                    ...values,
                    uploadPhotosButtonText: `${result ? result.length : 0} Photos uploaded`,
                    uploadedFiles:result
                    });
                    
            }
        );
    };
    

    //function for submitting data
    const Submitdata= ()=>{
        setValues({
            ...values,
            buttonText:'...Sending'
        });
        // condition for checking if image is uploaded or not 
        if(uploadedFiles)
        {
            if(uploadedFiles.length!==0)
            {

                document.getElementById('myimage').src=`${uploadedFiles[0].secure_url}`;
                document.getElementById('myimage').alt=`${uploadedFiles[0].original_filename}`;
                document.getElementById('myimage').width=200;
                document.getElementById('myimage').height=200;

                // sending data to the server or back-end
                axios.post(`${REACT_APP_API}/feedback`,{
                    data:{uploadedFiles,uploadPhotosButtonText}
                })
                .then(function(res){
                    // getting the response
                    let result=res.data;
                    toast.success("Successful");
                    document.getElementById('resultclass').innerHTML=result[0].class.toUpperCase();
                    document.getElementById('dogresult').innerHTML=result[0].class_probability[1];
                    document.getElementById('catresult').innerHTML=result[0].class_probability[0];
                    set();
                })
                .catch(error=>{
                    // if anyy error occur while sending the data back
                    toast.error("Server error");
                    set();
                });
            }
            else{
                //if no file is uploaded 
                toast.error('No file Uploaded');
                set();
            }          
        }
        else{
            //if no file is uploaded
            toast.error('No file Uploaded');
            set();
        }
    };
    

    // submission form and result front end 
    const feedbackForm = () => (
        <React.Fragment>
            <div className="form-group">
                <h2 className="text-info text-center">DOG AND CAT IMAGE CLASSIFIER</h2>
                <button onClick={()=>uploadWidget()} className="btn btn-outline-info btn-block p-5">{uploadPhotosButtonText}</button>
                <br/>
                <p className="text-info text-center">If you upload more than one photo only first one will be considered.</p>
                <p className="text-info text-center">Success rate is 80%, So some may be incorrect.</p>
                <div className="text-center">
                    <button onClick={()=>Submitdata()} className="btn btn-info mb-4">{buttonText}</button>
                    <hr/>
                </div>
                <div className='text-center'>
                    <img id="myimage" src={dogphoto} height="200px" width="200px" ></img>
                    <br/>
                    <br/>
                    <h3 id="resultclass" className="text-info"> Result</h3>
                    <hr/>
                </div>
                <div className="text-center text-info">
                    <br/>
                    <h4> Probablity Score</h4>
                    <table className="table table-hover table-info">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>DOG</th>
                                <th id="dogresult"> 0.00 </th>
                            </tr>
                            <tr>
                                <th>CAT</th>
                                <th id="catresult"> 0.00 </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
                <br/>
            </div>
        </React.Fragment>
    );

    // returning
    return (
        <div>
            <ToastContainer />
            <div className="container col-md-8 offset-md-2">
                {feedbackForm()}
                </div>
        </div>
    );
};

export default Feedback;