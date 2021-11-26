import { RequestHandler} from "express";
import bcrypt from "bcrypt";

const SECRET = process.env.SECRET;
if(!SECRET) {
    throw new Error("Missing SECRET");
}

export const verifySign: RequestHandler = async (req, res, next) => {
    let token = req.get("token") || "";
    try {
        if(!token) {
            throw new Error("Missing token in header");
        }
        await new Promise((resolve, reject) => {
            bcrypt.compare(SECRET, token, (err, result) => {
                if(err) return reject(err)
                if(result) {
                    resolve(next());
                } else {
                    reject(new Error("unAuthorized"))
                }
            })
        })
    } catch (err) {
        res.json({
            success: false,
            reason: (err as Error).message,
        })
    }
    
}