const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const { Puppy, User } = require("./db");
const { JWT_SECRET = "neverTell" } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Verifies token with jwt.verify and sets req.user
// TODO - Create authentication middleware
const setUser = async (req, res, next) => {
  const auth = req.header("Authorization");
  if (!auth) {
    res.sendStatus(401);
  } else {
    const [, token] = auth.split(" ");
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  };
};

// POST /puppies
// TODO - Require a user and set the puppy's ownerId
app.post("/puppies", setUser, async (req, res, next) => {
  const user = req.user;
  if (user) {
    const { name, age } = req.body;
    const puppy = await Puppy.create({ name, age, ownerId: user.id });
    res.send({ id: puppy.id, name: puppy.name, age: puppy.age });
  } else {
    res.sendStatus(401);
  };
});

// DELETE /puppies/:id
app.delete("/puppies/:id", setUser, async (req, res, next) => {
  const puppy = await Puppy.findByPk(req.params.id);
  const user = req.user;
  if (user.id === puppy.ownerId) {
    await puppy.destroy();
    res.send({ message: "success" });
  } else {
    res.sendStatus(401);
  };
});

app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
