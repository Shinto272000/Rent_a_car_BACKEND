import bcrypt from "bcrypt";
import User from "../Models/userModel.js";
import generateToken from "../utils/generateToken.js";


const ping = (req, res) => {
  res.send("hello world");
}

const checkUser = async (req, res) => {

  try {
    const user = req.user;
    const findUser = await User.findOne({ email: user.data });
    if (!findUser) {
      return res.send("user not found");
    }
    return res.send("user found");

  } catch (error) {
    console.log(error);
  }
}

const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, firstName, lastName } = req.body
    console.log(email);

    const userExist = await User.findOne({ email });
    console.log(userExist);


    if (userExist) {
      return res.send("User is already exist");
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      firstName,
      lastName,
      hashPassword,
    });

    const newUserCreated = await newUser.save();

    if (!newUserCreated) {
      return res.send("user is not created");
    }

    const token = generateToken(email);

    const isProduction = process.env.NODE_ENV === "production";
        // console.log(isProduction,'====idProduction');
        
        res.cookie("tokenss", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            secure: isProduction, // Secure only in production
            sameSite: isProduction ? "None" : "Lax", // 'None' for production, 'Lax' for development
        });
    res.send("Signed successfully!");
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
};


const signin = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log("loged user",user._id);

    const userId = user._id
    

    if (!user) {
      return res.send("User not found");
    }

    const matchPassword = await bcrypt.compare(password, user.hashPassword);

    if (!matchPassword) {
      return res.send("Password is not correct");
    }

    const token = generateToken(email);
    const isProduction = process.env.NODE_ENV === "production";
        // console.log(isProduction,'====idProduction');
        
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            secure: isProduction, // Secure only in production
            sameSite: isProduction ? "None" : "Lax", // 'None' for production, 'Lax' for development
        });
    // res.send("Logged in!");
    res.json({message:"Logged in!",userId,token})
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
};
const userController = { signup, ping, signin,checkUser }

export default userController