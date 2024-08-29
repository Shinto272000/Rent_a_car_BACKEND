import jwt from "jsonwebtoken"
import serverConfig from "../Config/serverConfig.js";

const authenticateDeals
 = (req,res,next)=>{

    const token = req.cookies.token
    console.log("dealer signin token is",token );
    
    jwt.verify(token,serverConfig.token, (err, result)=>{
        if (err){
            console.log(err);
            return res.status(401).send("not verified")
        }

        console.log("admin token",result);

        if(result.role !== "admin" && result.role !== "dealer"){
            res.status(401).send("not admin && not dealer")   
        }

        req.user=result

        next();
    });
};

export default authenticateDeals
; 


