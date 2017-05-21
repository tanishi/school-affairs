"use strict";

const Router = require("koa-router");
const router = new Router();

const DB = require("../db/db.js");

router
  .get("/", async (ctx) => {
  })
  .get("/:id", async (ctx) => {
  })
  .post("/", async (ctx) => {
    await DB.userDB.insert(ctx.request.body);
    ctx.status = 201;
  })
  .put("/:userID", async (ctx) => {
  })
  .delete("/:userID", async (ctx) => {
  })

module.exports = router;
