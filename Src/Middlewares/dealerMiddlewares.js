import jwt from "jsonwebtoken"
import serverConfig from "../Config/serverConfig.js";

const authenticateDls = (req,res,next)=>{

    const token = req.cookies.token
    jwt.verify(token,serverConfig.token, (err, result)=>{
        if (err){
            console.log(err);
            return res.status(401).send("not verified")
        }

        console.log("admin token",result);

        if(result.role !== "admin" && result.role !== "dealer"){
            return res.status(401).send("not admin && not dealer")
        }

        req.user=result

        next();
    });
};

export default authenticateDls; 