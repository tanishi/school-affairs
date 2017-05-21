"use strict";

const Koa = require("koa");
const app = new Koa();

const Router = require("koa-router");
const router = new Router();
const users = require("../routes/users.js");
const assignments = require("../routes/assignments.js");
const tasks = require("../routes/tasks.js");

const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa-cors");

app.use(router.routes());
router.use(logger());
router.use(json());
router.use(bodyParser());

const options = {
  origin: "*"
};

app.use(cors(options));

router
  .use("/", assignments.routes())
  .use("/users", users.routes())
  .use("/tasks", tasks.routes());

app.listen(3000, () =>{
  console.log("starting api server")
});
