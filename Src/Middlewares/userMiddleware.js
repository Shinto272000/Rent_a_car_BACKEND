import jwt from "jsonwebtoken"
import serverConfig from "../Config/serverConfig.js";


function authenticateUser(req, res, next){

    // const token = req.sessionStorage.token;
    const token = req.cookies.token;   
    jwt.verify(token,serverConfig.token, (err, user)=>{
        if (err){ 
            console.log(err); 
            return res.status(401).send("not verified")  
        }

        // console.log("user token result",result);

        req.user= user;
        console.log(req.user.role);
        

        next();
    });
};

export default authenticateUser;