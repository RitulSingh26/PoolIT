import bcrypt from 'bcryptjs';
import appuser from '../model/appuser.js';


export const userLogin = async(req,res)=>{
    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
}

export const userLogout =async(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3000");
    })
}


export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    let existingUser;
    try {
        existingUser = await appuser.findOne({ email });
    } catch (error) {
        return res.sendStatus(500);
    }
    if (existingUser) {
        return res.sendStatus(400);
    }
    const hashedPassword = bcrypt.hashSync(password);
    const newuser = new appuser({
        email,
        name,
        password: hashedPassword,
    });
    console.log("newuser", newuser);
    try {
        await newuser.save();
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
};


export const appuserlogin = async(req,res)=>{
    const {email,password}=req.body;
    let existingUser;
    try {
        existingUser = await appuser.findOne({email});
    } catch (error) {
        return error;
    }
    if(!existingUser){
        return res.sendStatus(404)
    }
    const checkPassword =bcrypt.compareSync(password,existingUser.password);
    if(!checkPassword){
        return res.sendStatus(400)
    }
    return res.send(existingUser)
}