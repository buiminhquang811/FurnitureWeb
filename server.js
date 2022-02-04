const express = require('express');
const path = require('path');
const {sequelize} = require("./models"); 
const { rootRouter } = require("./routers");
var cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//static file
const publicPath = path.join(__dirname, "./public");
app.use("/public", express.static(publicPath));

//router
app.use("/api/kltn", rootRouter);

// cài đặt ứng dụng kiểu json
app.use(express.json());

//connect
app.listen(4000, async () => {
    console.log("App listening on http://localhost:4000");
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  });
  