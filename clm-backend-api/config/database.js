const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/platform";
mongoose
  .connect(mongoDB)
  .then((db) => {
    console.log("\t\t\t\t\t\tSuccessfuly connected to the database!");
  })
  .catch((err) => console.log(err));

module.exports = mongoose;