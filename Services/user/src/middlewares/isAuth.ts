import type { Request , Response , NextFunction } from "express";
import jwt from "jsonwebtoken"
import type { JwtPayload } from "jsonwebtoken";
import type { IUser } from "../model/User.js";

export interface AuthenticatedRequset extends Request{
    user ?:IUser | null
}

export const isAuth = async(req:AuthenticatedRequset , res:Response , next : NextFunction):Promise<void> =>{
    try{
        const authheader = req.headers.authorization;

        if(!authheader || !authheader.startsWith("Bearer ")){

            res.status(401).json({
                message : "Please Login - No auth Header",
            });
            return ;
        }

        const token = authheader.split(" ")[1];

        if (!token) {
            res.status(401).json({
              message: "Please Login - Token is missing",
            });
            return;
          }

        const decodedValue = jwt.verify(token , process.env.JWT_SEC as string) as JwtPayload


        if (!decodedValue || !decodedValue.user){
            res.status(401).json({
                message : "Invalid Token"
            });

            return ; 
        }

        req.user = decodedValue.user;
        next();
    }
    catch(error){
        console.log("JWT Verification Error" , error);
        res.status(401).json({
            message : "please Login - JWT error" , 

        });
    }
}