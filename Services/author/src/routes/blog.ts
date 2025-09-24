import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { aiBlogResponse, aiDescriptionResponse, aiTitleResponse, createBlog, deleteBlog, updateBlog } from "../controllers/blog.js";


const router = express();

router.post("/blog/me" , isAuth , upload.single("file") , createBlog);
router.post("/blog/:id" , isAuth , upload.single("file") , updateBlog);
router.delete("/blog/:id", isAuth, deleteBlog);
router.post("/ai/title", aiTitleResponse);
router.post("/ai/descripiton", aiDescriptionResponse);
router.post("/ai/blog", aiBlogResponse);

export default router;