import React, { useState } from 'react';
import axios from 'axios';
import './upload.css'; 
import { useUser } from '../UserContext';



function Upload() {
    const userData = useUser();
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('jsonFile', file);
        formData.append('uploaderId', userData.userData._id);
        formData.append('uploaderName', userData.userData.name);
        

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage(response.data.message);
          
        } catch (error) {
            setMessage('Error uploading file');
            console.error(error);
        }
    };

    return (
        <div className="upload-container">
            <h1>Upload JSON File</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p className="message">{message}</p>
        </div>
    );
}

export default Upload;
