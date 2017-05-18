"use strict";

const Koa = require("koa");
const app = new Koa();

const serve = require("koa-static");
const logger = require("koa-logger");

app.use(logger());
app.use(serve(__dirname + "/../public"));

app.listen(80, () =>{
  console.log(__dirname);
  console.log("starting web server")
});
