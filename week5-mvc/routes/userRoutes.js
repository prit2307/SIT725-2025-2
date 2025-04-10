const express = require("express");
const router = express.Router();
const { createUser, getProjects } = require("../controllers/userController");

router.post("/submit", createUser);
router.get("/api/projects", getProjects);

module.exports = router;
