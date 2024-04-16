import express from "express";
import { userLogin,userLogout,signup,appuserlogin } from "./controller/login-controller.js";
import { uploadFile ,getallFiles,exportfile, exportAllFiles} from "./controller/file-controller.js";
const Router =express.Router();
import passport from "passport";
import multer from "multer";
import path from "path"; 
import fs from "fs"

import { fileURLToPath } from 'url';
import { dirname } from 'path';



Router.post('/signup',signup);
Router.post('/userlogin',appuserlogin);

Router.get('/login/sucess',userLogin);
Router.get('/logout',userLogout);


Router.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

Router.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/upload",
    failureRedirect:"http://localhost:3000/login"
}))


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage });
Router.post('/upload',upload.single('jsonFile'),uploadFile);
Router.get('/alljsonfiles',getallFiles);
Router.get('/export/singlefile/:id',exportfile);
Router.get('/export/allfile',exportAllFiles);


export default Router;

