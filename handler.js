const serverless = require("serverless-http");
const express = require("express");
const {
  listUsers,
  updateUser,
  deleteUser,
  listUser
} = require("./controllers/user");
const {
  createPost,
  listPosts,
  updatePost,
  deletePost,
  listPost
} = require("./controllers/post");
const handleErrors = require("./middlewares/handleError");
const { login, signup } = require("./controllers/auth");
const cors = require('cors');
const { validRequest, authRequest } = require("./middlewares/handleAuth");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// auth
app.post("/login", login);
app.post("/signup", signup);

// user
app.get("/user", [validRequest, authRequest], listUsers);
app.get("/user/:id", [validRequest, authRequest], listUser);
app.put("/user", [validRequest, authRequest], updateUser);
app.delete("/user/:id", [validRequest, authRequest], deleteUser);

// post
app.post("/post", [validRequest, authRequest], createPost);
app.get("/post", [validRequest, authRequest], listPosts);
app.get("/post/:id", [validRequest, authRequest], listPost);
app.put("/post", [validRequest, authRequest], updatePost);
app.delete("/post/:id", [validRequest, authRequest], deletePost);

app.get("/api", (req, res, next) => {
  return res.status(200).json({
    name: 'Welcome to serverless!'
  })
});

app.use(handleErrors);

module.exports.handler = serverless(app);
