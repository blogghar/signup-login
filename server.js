const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");

//Connecting the Database
connectDB();


const app = express()
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs")

const { adminAuth, userAuth } = require("./middleware/auth.js");
app.use("/api/auth", require("./auth/route"))

app.get("/", (req, res) => res.render("home"))
app.get("/register", (req, res) => res.render("register"))
app.get("/login", (req, res) => res.render("login"))
app.get("/admin", adminAuth, (req, res) => res.render("admin"))
app.get("/basic", userAuth, (req, res) => res.render("user"))


app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)
// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})

app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" })
  res.redirect("/")
})