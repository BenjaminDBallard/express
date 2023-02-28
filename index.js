const express = require("express");
require("body-parser");
const app = express();
const port = process.env.PORT || 4000;

const { users } = require("./state");

/* BEGIN - create routes here */
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  let index = users.findIndex((p) => p._id == req.params.id);
  console.log(index);
  res.json(users[index]);
});

app.post("/users", (req, res) => {
  let usrID = users.length + 1;
  users.push({
    _id: usrID,
    name: "New Person " + usrID,
    occupation: "New Job " + usrID,
    avatar: "New Image " + usrID,
  });

  res.json(users[usrID - 1]);
});

app.put("/users/:id", (req, res) => {
  const index = users.findIndex((p) => p._id == req.params.id);
  users[index].name = "Name Changed";
  res.json(users[index]);
});

app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((p) => p._id == req.params.id);
  users[index].isActive = false;
  res.send("Deleted");
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
