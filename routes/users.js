"use strict";

const Router = require("koa-router");
const router = new Router();

const DB = require("../db/db.js");

router
  .get("/", async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");

    try {
      ctx.body = await DB.userDB.find({});
      ctx.status = 200;
    } catch(e){
      console.log(e);
    }
  })
  .get("/:userID/tasks", async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");

    const userID = ctx.params.userID;

    try {
      const assignments = await DB.assignDB.find({"userID": userID});

      let tasks = [];
      for (let assignment of assignments){
        tasks.push(assignment.taskID);
      }

      ctx.body = tasks;
      ctx.status = 200;
    } catch(e){
      console.log(e);
    }
  })
  .post("/", async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");

    try {
      const user = await DB.userDB.insert(ctx.request.body);

      ctx.body = user;
      ctx.status = 201;
    } catch(e){
      console.log(e);
    }
  })
  .put("/:userID", async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");

    const userID = ctx.params.userID;

    try {
      const user = DB.userDB.update({"_id": userID}, {$set: ctx.request.body});

      ctx.body = user;
      ctx.status = 200;
    } catch(e){
      console.log(e);
    }
  })
  .delete("/:userID", async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");

    const userID = ctx.params.userID;

    try {
      const user = DB.userDB.remove({"_id": userID});

      ctx.status = 204;
    } catch(e){
      console.log(e);
    }
  })

module.exports = router;
