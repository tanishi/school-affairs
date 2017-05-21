"use strict";

const Router = require("koa-router");
const router = new Router();

const DB = require("../db/db.js");

router
  .get("/", async (ctx) => {
    await DB.taskDB.find({}, (err, docs) => {
      ctx.body = docs;
    });
  })
  .get("/:id", async (ctx) => {
    const taskID = ctx.request.body.taskID;
    await DB.taskDB.find({"taskID": taskID}, (err, docs) => {
      ctx.body = docs;
    });
  })
  .post("/", async (ctx) => {
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
    } catch (e){
      console.log(e);
    }
  })
  .post("/:userID", async (ctx) => {
    const userID = ctx.params.userID;

    await DB.taskDB.insert(ctx.request.body, (err, newDoc) => {
      taskID = newDoc._id;
    });

    const query = {
      "userID": userID,
      "taskID": ctx.request.body.taskID
    };
    await DB.assignDB.insert(query);
  })
  .put("/:id", async (ctx) => {
  })
  .delete("/:id", async (ctx) => {
  });

module.exports = router;
