
import bcrypt from "bcrypt"
import adminToken from "../utils/adminToken.js";
import Dealer from "../Models/dealerModel.js";


const checkAdmin = async (req, res) => {

  try {
    const dealer = req.user
    console.log(dealer)
    const findDealer = await Dealer.findOne({ email: dealer.data });

    if (!findDealer) {
      return res.json({
        success:false,
      })
    }
    return res.json({
      success:true,
    })
  }
  catch (error) {
    console.log(error);
  }
}


const singup = async (req, res) => { 
  try {
    console.log(req.body);

    const { email, password, name } = req.body;
    const dealerExist = await Dealer.findOne({ email });
    if (dealerExist) {
      return res.send("Dealer is already exist");
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newDealer = new Dealer({
      name,
      email,
      hashPassword,
      role: "dealer",
    });
    const newDealerCreated = await newDealer.save();

    if (!newDealerCreated) {
      return res.send("dealer is not created");
    }

    const token = adminToken(newDealerCreated);
    res.cookie("token", token);
    res.json({ message: "signned in!", token });
  } catch (error) {
    console.log(error, "Something wrong");
  }
};

const singin = async (req, res) => {
  try {
    const body = req.body;
    const { email, password } = body;
    console.log(body);

    const dealer = await Dealer.findOne({ email });

    if (!dealer) {
      return res.send("dealer is not found");
    }

    const matchPassword = await bcrypt.compare(
      password,
      dealer.hashPassword
    );

    console.log(matchPassword, "matchpassword");
    if (!matchPassword) {
      return res.send("password is not match");
    }

    const token = adminToken(dealer);

    res.cookie("token", token);
    res.send("Logged in!");
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Internal Server Error");
  }
};
const getAllDealers = async (req, res) => {
  const dealers = await Dealer.find();
  return res.send(dealers);
};

const removeDealers = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const dealer = await Dealer.find({ _id: id });
  if (!dealer) {
    return res.send("Dealer is not exist");
  }
  const remove = await Dealer.deleteOne({ _id: id });

  if (!remove) {
    return res.send("failed to remove");
  }

  return res.send("removed sucessfully");
};

const dealercontroller = { singin, singup, getAllDealers, removeDealers,checkAdmin }

export default dealercontroller 