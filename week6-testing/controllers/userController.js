const User = require("../models/userModel");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    res.json({ message: "User saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving user" });
  }
};

const getProjects = (req, res) => {
  const cardList = [
    {
      title: "Kitten 2",
      image: "images/kitten-2.jpg",
      link: "About Kitten 2",
      desciption: "Demo desciption about kitten 2",
    },
    {
      title: "Kitten 3",
      image: "images/kitten-3.jpg",
      link: "About Kitten 3",
      desciption: "Demo desciption about kitten 3",
    },
  ];
  res.json({ statusCode: 200, data: cardList, message: "Success" });
};

module.exports = { createUser, getProjects };
