require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Importing the Db Cofig file to connect DB
const connectDB = require("./config/dbConn");

// External Routes

const userRoute = require("./routes/UsersRoute");

const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Data is sent from server" }).status(200);
});

app.use("/users", userRoute);

mongoose.connection.once("open", () => {
  console.log("DB is connected Successfully.");
  app.listen(PORT, () => console.log(`Server is listening at port: ${PORT}`));
});
