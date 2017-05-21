"use strict";

const Router = require("koa-router");
const router = new Router();

const DB = require("../db/db.js");

router
  .get("/", async (ctx) => {
    ctx.body = await DB.userDB.find({});
  })
  .get("/:userID/tasks", async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    const userID = ctx.params.userID;

    const assignments = await DB.assignDB.find({"userID": userID});

    let tasks = [];
    for (let assignment of assignments){
      tasks.push(assignment.taskID);
    }
    console.log("/:userID/tasks");
    console.log(tasks);

    ctx.body = tasks;
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
