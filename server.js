const express = require("express")
const connectDB = require("./db");

//Connecting the Database
connectDB();


const app = express()
const PORT = 5000

app.use(express.json())
app.use("/api/auth", require("./auth/route"))



const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)
// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})