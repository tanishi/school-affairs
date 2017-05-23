"use strict";

const Router = require("koa-router");
const router = new Router();

const DB = require("../db/db.js");

router
  .get("/", async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");

    try {
      const tasks = await DB.taskDB.find({});

      ctx.body = tasks;
      ctx.status = 200;
    } catch(e){
      console.log(e);
    }
  })
  .get("/:taskID", async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");

    const taskID = ctx.params.taskID;

    try {
      const task = await DB.taskDB.findOne({"_id": taskID});

      ctx.body = task;
      ctx.status = 200;
    } catch(e){
      console.log(e);
    }
  })
  .post("/", async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");

    try {
      const task = await DB.taskDB.insert(ctx.request.body);
      const users = await DB.userDB.find({});

      for (let user of users){
        const query = {
          "userID": user._id,
          "taskID": task._id
        };
        await DB.assignDB.insert(query);
      }

      ctx.status = 201;
    } catch(e){
      console.log(e);
    }
  })
  .post("/:userID", async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");

    const userID = ctx.params.userID;

    try {
      const task = await DB.taskDB.insert(ctx.request.body);

      const query = {
        "userID": userID,
        "taskID": task._id
      };
      await DB.assignDB.insert(query);

      ctx.body = task;
      ctx.status = 201;
    } catch(e){
      console.log(e);
    }
  })
  .put("/:taskID", async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");

    const taskID = ctx.params.taskID;

    try {
      const task = DB.taskDB.update({"_id": taskID}, {$set: ctx.request.body});

      ctx.body = task;
      ctx.status = 200;
    } catch(e){
      console.log(e);
    }
  })
  .delete("/:taskID", async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");

    const taskID = ctx.params.taskID;

    try {
      const task = DB.userDB.remove({"_id": taskID});

      ctx.status = 204;
    } catch(e){
      console.log(e);
    }
  });

module.exports = router;
