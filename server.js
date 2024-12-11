const express = require("express");
const errorHandler = require("./middleware/error_handler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;



app.use(express.json());
app.use("/api", require("./route/user"));
app.use("/api", require("./route/post"));
app.use("/api", require("./route/comment"));
app.use("/api", require("./route/like"));
app.use(errorHandler);
connectDb();

app.listen(port, () => {
  console.log(`server is listen on the port ${port}`);
});