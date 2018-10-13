import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

export default class Middleware{
    constructor(){
    }

    verifyCred(req, res, next){
        if(!req.headers.authorization){
            return next();
        } 
        let jwtToken = req.headers.authorization.split(" ")[1];
        let client_id = req.headers.client_id; //it's bcrypted email
        jwt.verify(jwtToken, 'jwt', (err, decoded) => {
            if(!err && bcrypt.compareSync(decoded.email, client_id)){
                req.headers.user = decoded;
            }
            return next();
        })
    }
};

