"use strict";

const Router = require("koa-router");
const router = new Router();

router
  .get("/", async (ctx) => {
    console.log("/user");
  })
  .get("/:id", async (ctx) => {
    console.log("/user" + ctx.params.id);
  })

module.exports = router;
