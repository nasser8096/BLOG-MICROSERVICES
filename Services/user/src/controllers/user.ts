
import User from "../model/User.js";
import jwt from "jsonwebtoken"
import TryCatch from "../utils/Trycatch.js";
import type {AuthenticatedRequset} from "../middlewares/isAuth.js"
import { getDataUri } from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import { oauth2client } from "../utils/GoogleConfig.js";
import axios from "axios";


export const loginuser =TryCatch( async(req, res)=>{
   

    const { code } = req.body;

    if (!code) {
      res.status(400).json({
        message: "Authorization code is required",
      });
      return;
    }
  
    const googleRes = await oauth2client.getToken(code);
  
    oauth2client.setCredentials(googleRes.tokens);
  
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;

    let user = await User.findOne({ email });
  
    if (!user) {
      user = await User.create({
        name,
        email,
        image: picture,
      });
    }
    const token = jwt.sign({user}, process.env.JWT_SEC as string, {expiresIn : "5d"});

    res.status(200).json({
        message : "Login Success" , 
        token,
        user,
    });
});


// fetch profile Data

export const myprofile = TryCatch(async(req:AuthenticatedRequset , res)=>{
    const user = req.user;
    res.json(user);
})


// get user profile

export const getuserprofile = TryCatch(async(req , res)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        res.status(404).json({
            message : "No user with this id"
        });
        return ;
    }

    res.json(user);
});


// Update User Profile

export const updateuser = TryCatch(async(req:AuthenticatedRequset , res)=>{
    const {name , instagram , facebook , linkedin , bio} = req.body;

    const user = await User.findByIdAndUpdate(req.user?._id , {name , instagram , facebook , linkedin , bio} , {new:true});

    const token = jwt.sign({user} , process.env.JWT_SEC as string , {expiresIn : '5d'});


    res.json({message : "user updated" , token , user});
});

//Update Profile Pic 

export const updateprofilepic = TryCatch(async(req:AuthenticatedRequset , res)=>{
    const file = req.file ;
    
    if(!file){
        res.status(400).json({
            message : "No file to upload"
        });
        return;
    }

    const filebuffer = getDataUri(file);

    if(!filebuffer  || !filebuffer.content){
        res.status(400).json({
            message : "Failed to generate buffer",
        });
        return;

    }

    console.log("FileBuffer Content snippet:", filebuffer.content?.substring(0, 100));
    console.log("FileBuffer length:", filebuffer.content?.length);



    const uploadResponse = await cloudinary.uploader.upload(filebuffer.content!, {
        folder: "blogs", // optional
        resource_type: "auto",
        
      });

      const user = await User.findByIdAndUpdate(req.user?._id , {
        image : uploadResponse.secure_url
      } , {new : true});


      const token = jwt.sign({user} , process.env.JWT_SEC as string , {expiresIn : '5d'});


    res.json({message : "user  Profile updated" , token , user});
    
});