import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import OAuth2Strategy from 'passport-google-oauth2';
import userdb from './model/user.js';
import cors from 'cors';
import Router from './routes.js';
import dotenv from 'dotenv';

dotenv.config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const app =express();
app.use(express.json());


app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
app.use(session({
    secret:"ritul",
    resave:false,
    saveUninitialized:true
}))


app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientId,
        clientSecret:clientSecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await userdb.findOne({googleId:profile.id});
            if(!user){
                user = new userdb({
                    googleId:profile.id,
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });
                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});


app.use('/',Router);



const DB='mongodb://localhost:27017'
mongoose.connect(DB)
.then(app.listen(5000))
.then(()=>console.log("connected to server"))
.catch((err)=>console.log(err));



