const mongoose = require("mongoose");
const userModel = require("../Model/User");
const express = require("express");
const { createAccount, fetchUsers } = require("../Controller/UserController");

const router = express.Router();

router.use(express.json());

router.post("/", createAccount);

router.get("/fetchRecords", fetchUsers);

module.exports = router;
