import jwt from "jsonwebtoken" 
import serverConfig from "../Config/serverConfig.js";


function adminToken(user) {
    return jwt.sign({data:user.email ,role : user.role}, serverConfig.token, { expiresIn: '1d' });
  }

  export default adminToken;