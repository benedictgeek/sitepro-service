"use strict";
const express = require("express");
const path = require("path");
const { HttpError } = require("../helpers/HttpError");
const apiRoutes = require("../factory/routes");

module.exports.setRoutes = (app) => {
  app.get("/", (req, res) => {
    res.send("Welcome to the APP");
  });

  app.use("/api", apiRoutes);

  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

  app.use("/*", (req, res) => {
    const error = new Error("Requested path does not exist.");

    error.statusCode = 404;
    res.status(error.statusCode).json(new HttpError(error));
  });
};
