"use strict";

const Router = require("koa-router");
const router = new Router();

const DataStore = require("nedb-promise");
const recordDB = new DataStore({
  filename: "./db/record.db",
  autoload: true
});

router
  .get(":id/status", async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.body = ctx.params.id;
  })

module.exports = router;
