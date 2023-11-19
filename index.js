//Connecting with MongoDB using the mongoose package
const mongoose = require("mongoose");
//Connecting with the Database
mongoose
  .connect("mongodb://127.0.0.1:27017/dwyn", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((Inf, Err) => {
    if (Inf) {
      console.log("\nHa Bhai Ho gaya connect");
    } else if (Err) {
      console.log("\nERROR"); //mongodb://localhost:27017
    }
  });
/* .catch((e) => {
    console.log("\n\n\nYo Thara Error\n\n\n");
  }) */
const { Schema } = mongoose;
const student = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true, unique: true, min: 18, max: 90 },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          /\S+@\S+\.\S+/.test(value);
        },
        message: true,
      },
    },
  },
  { collection: "adi" }
);
/* student.pre("save", (next) => {
  console.log("\nHa Document Save Ho Raha Hai", next.name);
  next();
});
student.post("save", (doc, next) => {
  console.log("\nHa Document Save Ho gaya", doc.name);
  next();
}); */
const Student = new mongoose.model("adi", student);

const adder = async (name, age, email) => {
  const addedUser = await Student.create({
    name: name,
    age: age,
    email: email,
  });
  console.log("The User Is", addedUser._id);
  await addedUser.save();
};

const reader = async () => {
  const readResult = await Student.find({
    /* name: "Aditya" */
  });
  for (i in readResult) {
    console.log(
      "\n----------User----------",
      "\n Name = ",
      readResult[i].name,
      "\n Age = ",
      readResult[i].age,
      "\n----------XXXX----------"
    );
  }
};
const updater = async (searchName, changedName) => {
  const updateResult = await Student.updateOne(
    { name: searchName },
    { name: changedName }
  );
  console.log("Ha Ho Gaya Update, Ye Dekho", updateResult);
};
const deleter = async (searchName) => {
  const deleteResult = await Student.deleteOne({ name: searchName });
  console.log("Ha Ye Ho Gaya Delete", deleteResult);
};
const bulkDeleter = async (searchName = "") => {
  deleteResult = searchName
    ? await Student.deleteMany({ name: searchName })
    : await Student.deleteMany({});
  await mongoose.disconnect();

  console.log("Ha Ye Ho Gaya Delete", deleteResult);
};
async function adderContainer() {
  try {
    await adder("Aditya", 20, "arsrivastawa@gmail.com");
    await adder("Ladki-1", 18, "email@gmail.com");
    await adder("Arin Raj", 19, "sample@gmail.com");
    await adder("Ladki-2", 21, "example@gmail.com");
    // await mongoose.disconnect();
  } catch (e) {
    console.log(e.message);
  }
}
// adderContainer();
setTimeout(() => {
  reader();
}, 1000);
// bulkDeleter();
// reader();
// updater("Aditya", "Rahul");
// deleter("Rahul");

/* {
    name: { type: String, required: true },
    age: { type: Number, unique: true, required: true, min: 18, max: 100 },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => /\S+@\S+\.\S+/.test(value),
        message: true,
      },
    },
  },
  { collection: "adi" } */
