const express = require("express");
const dbRouter = require("../Posts/db-router");

const server = express();

// server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Node 2 Project</h>`);
});

server.use("/api/posts", dbRouter);

module.exports = server;
