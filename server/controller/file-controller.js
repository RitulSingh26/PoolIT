import userfile from "../model/file.js";
import jsonexport from 'jsonexport';
import archiver from 'archiver';
import fs from 'fs';



export const uploadFile= async (req, res) => {
    console.log("reqbody",req.body);
    console.log("req.file",req.file)
    const userId = req.body.uploaderId;
    const userName =req.body.uploaderName;
    const fileName = req.file.originalname;
    const file = req.file.path;
  
    try {
      const userFile = new userfile({
        userId,
        userName,
        fileName,
        file
      });
  
      await userFile.save();
  
      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error uploading file' });
    }
  }

  export const getallFiles =async(req,res)=>{
    try {
      
        const files = await userfile.find({}, 'fileName userName _id'); 
        const fileData = files.map(file => ({
            id:file._id,
            fileName: file.fileName,
            userName: file.userName
        }));
        res.status(200).json({ fileData});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
  }

export const exportfile= async (req, res) => {
    try {
      
      const fileData = await userfile.findById(req.params.id);
      if (!fileData) {
        return res.status(404).json({ message: 'File not found' });
      }
  
      const filePath = fileData.file;
  
      fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
          return res.status(500).json({ message: 'Error reading file' });
        }
  
        jsonexport(JSON.parse(data), async (err, csv) => {
          if (err) {
            return res.status(500).json({ message: 'Error converting to CSV' });
          }
  
          res.setHeader('Content-Type', 'text/csv');
          res.setHeader('Content-Disposition', `attachment; filename=${fileData.fileName}.csv`);
  
          
          res.send(csv);
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


  export const exportAllFiles = async (req, res) => {
    try {
     
      const files = await userfile.find({}, 'fileName file');
  
      const archive = archiver('zip');
      archive.pipe(res);

      for (const file of files) {
        const csvData = await convertJsonToCsv(file.file);
        archive.append(csvData, { name: `${file.fileName}.csv` });
      }
      archive.finalize();
    } catch (error) {
      console.error('Error exporting files:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
 
  const convertJsonToCsv = async (filePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject('Error reading file');
        } else {
          jsonexport(JSON.parse(data), (err, csv) => {
            if (err) {
              reject('Error converting to CSV');
            } else {
              resolve(csv);
            }
          });
        }
      });
    });
  };