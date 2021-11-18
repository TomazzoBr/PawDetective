import mongoose from "mongoose";
mongoose.connect("mongodb://localhost/db_paws");

const db = mongoose.connection;

db.on("error", function () {
  console.error("connection error");
});
db.once("open", function () {
  console.log("we are connected to the database!");
});

export default db;
