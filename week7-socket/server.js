const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;


const http = require("http").createServer(app); 
const io = require("socket.io")(http); 

const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "view")));

mongoose.connect("mongodb://localhost:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");

  if (process.env.NODE_ENV !== "test") {
    http.listen(port, () =>
      console.log(`Server running at http://localhost:${port}`)
    );
  }
});


app.use("/", userRoutes);


io.on("connection", (socket) => {
  console.log("A user connected");


  socket.emit("message", "Welcome to the WebSocket server!");


  socket.on("chat message", (msg) => {
    console.log("Message from client:", msg);
    

    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

module.exports = app;
