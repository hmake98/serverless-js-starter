const serverless = require("serverless-http");
const express = require("express");
const { createUser, listUsers, updateUser, deleteUser } = require("./controllers/user");
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();
const app = express();

app.get("/", (req, res, next) => {
  res.status(200).json({
    name: 'Welcome to serverless!'
  })
})

// users
app.post("/user/create", createUser);
app.get("/user/list", listUsers);
app.put("/user/update", updateUser);
app.delete("/user/:id", deleteUser)

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
