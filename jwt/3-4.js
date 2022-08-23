const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const {User} = require('./db');
const SALT_COUNT = 10;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

/* ***************** YOUR ROUTE HANDLERS BELOW ***************** */

// POST /register
app.post("register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, SALT_COUNT);
    const user = await User.create({
      username,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: user.id,
        user: user.username,
      },
      process.env.JWT_SECRET
    );

    res.send({
      message: "success",
      token,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /login
app.post("register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findAll({
      where: { username: username },
      limit: 1,
    });

    const isFound = await bcrypt.compare(password, user[0].password);

    if (isFound) {

      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET
      );

      res.send({ message: "success", token });
    } else {
      res.status(401).send("incorrect username or password");
    }

  } catch (error) {
    console.error(error);
    next(error);
  };
});

/* ***************** YOUR ROUTE HANDLERS ABOVE ***************** */

// error handling middleware, so failed tests receive them
app.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if(res.statusCode < 400) res.status(500);
  res.send({error: error.message, name: error.name, message: error.message});
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
