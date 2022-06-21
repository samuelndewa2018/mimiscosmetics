const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload());

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// Route imports
const product = require("./routes/ProductRoute");
const productNew = require("./routes/ProductNewRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const mpesaRoutes = require("./routes/mpesa");

app.use("/api/v2", product);
app.use("/api/v2", productNew);
app.use("/api/v2", user);
app.use("/api/v2", order);
app.use("/process/api/v2", mpesaRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// it's for errorHandeling
app.use(ErrorHandler);

module.exports = app;
