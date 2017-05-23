"use strict";

const Router = require("koa-router");
const router = new Router();

const DB = require("../db/db.js");

router
  .get(":userID/status", async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");

    try {
      const userID = ctx.params.userID;

      const assignments = await DB.assignDB.find({"userID": userID});

      let deadlines = [];
      for (let assignment of assignments){
        const taskID = assignment.taskID;
        const deadline = await DB.taskDB.findOne({"_id": taskID});

        deadlines.push(deadline);
      }

      ctx.body = deadlines;
      ctx.status = 200;
    } catch(e){
      console.log(e);
    }
  });


module.exports = router;
