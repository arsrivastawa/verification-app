//Connecting with MongoDB using the mongodb package
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017"; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToMongo();

async function addDataToCollection(name, age, email) {
  try {
    const database = client.db("dwyn"); // Replace with your database name
    const collection = database.collection("adi"); // Replace with your collection name

    // Data to be inserted
    const dataToInsert = {
      name: name,
      age: age,
      email: email,
    };

    const result = await collection.insertOne(dataToInsert);
    console.log(
      "Data added successfully:",
      result.insertedId,
      "\n",
      name,
      "\n"
    );
  } catch (err) {
    console.error("Error adding data:", err);
  } finally {
    // Close the connection after adding data (optional, you can keep the connection open for other operations)
    // client.close();
  }
}

const deleteRecords = async () => {
  try {
    const del = await client.db("dwyn").collection("adi").deleteMany();

    console.log("Deleted Above Records Succesfully", del);
  } catch (err) {
    console.log("This is the Error", err);
  } finally {
    // client.close();
  }
};
async function updateRecord(nameForSearch, age) {
  try {
    connectToMongo();
    const database = client.db("dwyn");
    const collection = database.collection("adi");
    const filter = { name: nameForSearch };
    const update = { $set: { age } };
    const result = await collection.updateOne(filter, update);
    console.log(
      "The Record has been updated successfully",
      result.modifiedCount
    );
  } catch (err) {
    console.log(err);
  }
}
addDataToCollection("Arin Raj", 19, "example@gmail.com");
deleteRecords();
addDataToCollection("Rahul", 18, "email@gmail.com");
updateRecord("Rahul", 21);
setTimeout(() => {
  client.close();
}, 2000);
