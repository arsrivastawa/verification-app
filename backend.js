const bc = require("bcrypt");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
app.use(bodyParser.json());
app.use(cors());
let afterDeletion;
//Class for Data Object------------------------------------------>
class Data {
  // name;
  // email;
  // age;
  // password;
  constructor(name, email, age, hPass, salt) {
    this.name = name ? name : null;
    this.email = email ? email : null;
    this.age = age ? age : null;
    this.password = hPass ? hPass : null;
    this.salt = salt ? salt : null;
    this.verified = false;
  }
}
function findCommon(str1, str2) {
  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str1.length; j++) {
      if (str1[i] == str2[j]) {
        return true;
      }
    }
  }
  return false;
}
//Connect to the DataBase----------------------------------------->
mongoose
  .connect("mongodb://127.0.0.1:27017/dwyn")
  .then(console.log("\n\nGot Connected to the DataBase"))
  .catch((err) => {
    // console.log("\n\nYo Ho Gaya Error");
  });
const { Schema } = mongoose;
const sch = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
    },
  },
  { collection: "mern" }
);
let result;
const User = new mongoose.model("mern", sch);
async function add(age, email, name, password, res) {
  let salts;
  let saltRounds = 10;
  let hashedPass;
  salts = await bc.genSalt(saltRounds, "b");
  hashedPass = await bc.hash(password, salts);
  result = await User.create(new Data(name, email, age, hashedPass, salts));
  res.json({ val: true });
}
async function update(id, ag, eml, nam, res) {
  let updateDetails = {};
  if (nam != undefined && nam != "") {
    updateDetails.name = nam;
  }
  if (ag != undefined && nam != "") {
    updateDetails.age = ag;
  }
  if (eml != undefined && eml != "") {
    updateDetails.email = eml;
  }
  try {
    const updateResult = await User.findOneAndUpdate(
      { _id: id },
      updateDetails
    );
    res.json({ val: true });
  } catch (err) {
    res.json({ val: false });
  }
}
// console.log("\n\n", result, "\n\n");
// console.log(
//   "\n----------User----------",
//   "\n Name = ",
//   result.name,
//   "\n Age = ",
//   result.age,
//   "\n Email = ",
//   result.email,
//   "\n PassWord = ",
//   result.password,
//   "\n salt = ",
//   result.salt,
//   "\n----------XXXX----------"
// );
let showData_result;
async function show(res, search = {}) {
  if (search != {}) {
    showData_result = await User.find(search);
    // console.log("\n", showData_result, "\n", "\nType ", typeof showData_result);
    res.json({ formData: showData_result });
  }
}
async function searcher(res, search) {
  if (findCommon(search, "1234567890")) {
    console.log("we found id");
    let searchResult;
    try {
      searchResult = await User.find({ _id: search });
    } catch (err) {
      res.json({ value: false });
      console.log("got an error in id");
    }
    if (searchResult) {
      res.json({ value: true });
      console.log("\n", searchResult);
    }
  } else {
    console.log("we found name");
    try {
      searchResult = await User.find({ name: search });
    } catch (err) {
      res.json({ value: false });
      console.log("got an error in name");
    }
    if (searchResult) {
      res.json({ value: searchResult });
      console.log("\n", searchResult);
    }
  }
}
//-------------------------------CREATAE THE MAILING SERVICE------------------------>
const Transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "drdwyn1@gmail.com",
    pass: "rzelwbvlrsdtkfoh",
  },
});
let otpGenerated;
app.post("/verify-otp", (req, res) => {
  const { otp } = req.body;
  if (otp == otpGenerated) {
    res.json({ value: true });
  } else {
    res.json({ value: false });
  }
});
app.post("/send-otp", (req, res) => {
  otpGenerated = (Math.random() * 1000000).toFixed().padStart(6, 0);
  const { email } = req.body;
  const mailOptions = {
    from: "Aditya drdwyn1@gmail.com",
    to: email,
    subject: "Please Verify Your OTP",
    html: `<html><head><title>OTP For Verification</title></head><body><h1>Verify OTP</h1><h3>Enter the below mentioned OTP and Verify</h3><div style="border: 3px solid blue; width:100%; text-align:center; border-radius: 6px; color: blue; font-size: 25px;font-weight:900;">${otpGenerated}</div></body></html>`,
  };
  // console.log("\nAb Mail Send Hoga Kuchh hi der me\n");
  Transport.sendMail(mailOptions, (err, inf) => {
    if (inf) {
      // console.log("\nWe Sent The OTP");
      res.status(200).json({ val: true });
    } else {
      // console.log("\nWe Couldn't Send The OTP");
      res.status(200).json({ val: false });
    }
  });
});
app.post("/load-data", (req, res) => {
  show(res);
});
//-------------------------------CREATE THE SERVER--------------------------------->
app.post("/send", (req, res) => {
  // console.log("\nfirst\n");
  const reqType = req.header("type");
  console.log(reqType);
  if (reqType === "create") {
    const { age, email, name, password } = req.body;
    add(age, email, name, password, res);
  } else if (reqType === "update") {
    const { id, name, email, age } = req.body;
    update(id, age, email, name, res);
  }
});
async function deleter(res, ID) {
  let deleted = await User.deleteOne({ _id: ID });
  afterDeletion = await User.find({});
  res.json({ val: afterDeletion });
}
app.post("/delete", (req, res) => {
  const { id: deletionID } = req.body;
  // console.log("Ye Hoga Delete : ", deletionID);
  deleter(res, deletionID);
});
app.post("/search", (req, res) => {
  // console.log("\nfirst\n");
  const { search } = req.body;
  searcher(res, search);
});
app.listen(3001, () => {
  // console.log("\n\n We made The Connection");
});

/* const { otpFromClient } = req.body;
  if (otpFromClient == otpGenerated) {
    res.json({ value: true });
  } else {
    res.json({ value: false });
  }
*/
