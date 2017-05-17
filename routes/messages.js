"use strict";

const Router = require("koa-router");
const router = new Router();

const DataStore = require("nedb-promise");
const messageDB = new DataStore({
  filename: "./db/message.db",
  autoload: true
});

router
  .get("/", async (ctx) => {
  })
  .get("/:id", async (ctx) => {
  })
  .post("/", async (ctx) => {
    console.log(ctx.request.body);
  })
  .put("/:id", async (ctx) => {
  })
  .delete("/:id", async (ctx) => {
  })

module.exports = router;
