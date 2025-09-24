
import DatauriParser from "datauri/parser.js";
import path from "path";

const parser = new DatauriParser();

export const getDataUri = (file: Express.Multer.File) => {
    const ext = path.extname(file.originalname).toString();
    return parser.format(ext, file.buffer); 
  };
  
