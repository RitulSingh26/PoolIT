import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { saveAs } from 'file-saver';
import './dashboard.css';

const Dashboard = () => {
   const [allFile,setAllFiles] =useState({});
  
  const handleExportClick = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/export/singlefile/${id}`, {
            responseType: 'blob' 
        });
    
        saveAs(response.data, 'exported_file.csv');
    } catch (error) {
        console.error('Error exporting file:', error);
    }
}

const handleExportAll =async () =>{
    try {
        const response = await axios.get("http://localhost:5000/export/allfile",{
          responseType:"blob"
        });
        console.log("res",response)
        const fileName = "alljsonfile.zip";
        saveAs(response.data, fileName);
    } catch (error) {
      console.error('Error exporting file:', error);
    }
}

const getFiles = async () =>{
    try {
        const files = await axios.get("http://localhost:5000/alljsonfiles");
        setAllFiles(files);
    } catch (error) {
        console.log(error)
    }
}



useEffect(() => {
  getFiles()
}, [])
  return (
    <div style={{textAlign:"center"}}>
        <div className="user_table">
              <table>
                <thead>
                  <tr>
                    <th>Uploaded File</th>
                    <th>uploaded By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allFile.data &&allFile.data.fileData.length > 0 ? (
                    allFile.data.fileData.map((file) => (
                      <tr key={file.id}>
                        <td>{file.fileName}</td>
                        <td>{file.userName}</td>
                        <td className="user_table_btn">
                        <button onClick={()=>handleExportClick(file.id)}>Export</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No File Uploaded</td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div>
                {allFile.data && allFile.data.fileData.length>0?(
                    <button onClick={handleExportAll}>ExportAllFiles</button>
                ):(" ")}
              </div>
            </div>    
      </div>
  )
}

export default Dashboard