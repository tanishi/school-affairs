"use strict";

const Koa = require("koa");
const app = new Koa();

const Router = require("koa-router");
const router = new Router();
const users = require("../routes/users.js");
const records = require("../routes/records.js");

const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa-cors");

app.use(router.routes());
app.use(json());
app.use(bodyParser());
app.use(logger());


const options = {
  origin: "*"
};
app.use(cors(options));

router
.use("/", records.routes())
.use("/users", users.routes())
.use("/messages", users.routes());

app.listen(3000, () =>{
  console.log("starting api server")
});
