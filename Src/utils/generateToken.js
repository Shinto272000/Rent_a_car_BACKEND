import jwt from "jsonwebtoken"
import serverConfig from "../Config/serverConfig.js";


function generateToken(email) {
    return jwt.sign({data:email}, serverConfig.token, { expiresIn: '1d' });
  }

  export default generateToken
