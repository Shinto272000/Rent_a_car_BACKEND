import jwt from "jsonwebtoken"
import serverConfig from "../Config/serverConfig.js";


const authenticateAdmin = (req,res,next)=>{

    const token = req.cookies.token;
    console.log("authentcate admin token is",token);
    
    jwt.verify(token,serverConfig.token, (err, result)=>{
        if (err){
            console.log(err);
            return res.status(401).send("not verified")
        }

        console.log("admin token result",result);

        if(result.role !=="admin"){
            return res.status(401).send("not admin")
        }

        req.user=result;

        next();
    });
};

export default authenticateAdmin;