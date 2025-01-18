require("dotenv").config();
const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("index.ejs", { title: "Home" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
