var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("./config/database");
const TemplatesAPI = require("./routes/TemplatesAPI");
const TemplateElementsAPI = require("./routes/TemplateElements");

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
app.use("/api/templates", TemplatesAPI);
app.use("/api/templateElements", TemplateElementsAPI);

module.exports = app;
