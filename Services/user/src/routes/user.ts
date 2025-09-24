import express from "express"
import { getuserprofile, loginuser, myprofile, updateprofilepic, updateuser } from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

router.post("/login" , loginuser);

router.get("/me" , isAuth , myprofile);

router.get("/user/:id" , getuserprofile);

router.post("/user/update" , isAuth , updateuser);

router.post("/user/update/pic" , isAuth , upload.single("file") , updateprofilepic); 

  
export default router;