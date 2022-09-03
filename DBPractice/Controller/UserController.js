const mongoose = require("mongoose");
const userModel = require("../Model/User");

const createAccount = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res
      .json({
        errorMessage:
          "username and password are mandatory to create an account.",
      })
      .status(400);
    return;
  } else {
    try {
      const existingUser = await userModel.findOne({ username: username }).exec();

      if (existingUser) {
        console.log(existingUser);
        res.status(409);
        res.json({ message: "User Already Exists with the given username" });
      } else {
        const result = await userModel.create({
          username: username,
          password: password,
        });

        res.json(result).status(201);
        res.end();
      }
    } catch (err) {
      console.error(err);
    }
  }
};

const fetchUsers = async (req, res) => {
  try {
    const result = await userModel.find({}, { username: 1, password: 1, _id: 0 }).exec();

    const finalResult = [];

    for (item of result) {
      finalResult.push(item);
      console.log(item);
    }
    res.json(finalResult).status(200);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  fetchUsers,
  createAccount,
};
