const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const connection = require("./database/mysqlDB");

const app = express();

// database init
function mysqlConnect() {
  global.connection = mysql.createConnection(connection);

  global.connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db");
      setTimeout(mysqlConnect, 2000);
    }
    console.log("connected to database");
    global.connection.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
  global.connection.on("error", function (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      mysqlConnect();
    } else {
      throw err;
    }
  });
}

mysqlConnect();

// Routes
const userRoutes = require("./routes/user");

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", userRoutes);

// PORT
const port = process.env.PORT ;

//sending data to html 

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("Hello World")
})

app.get("/user",(req,res)=>{
    const q="SELECT * FROM users"
    global.connection.query("SELECT * FROM users",(err,data)=>{
        if(err) return res.json(err)
        console.log(data)
        return res.json(data)
    })
})

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

