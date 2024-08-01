import jwt from "jsonwebtoken"
import serverConfig from "../Config/serverConfig.js";


function generateToken(username) {
    return jwt.sign({data:username}, serverConfig.token, { expiresIn: '1d' });
  }

  export default generateToken
