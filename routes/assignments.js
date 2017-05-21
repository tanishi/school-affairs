"use strict";

const Router = require("koa-router");
const router = new Router();

const DB = require("../db/db.js");

router
  .get(":id/status", async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    const id = ctx.params.id;
    let deadlines = [];

    console.log(id);
    const assignments = await DB.assignDB.find({"userID": id});

    for (let assignment of assignments){
      const taskID = assignment.taskID;
      const deadline = await DB.taskDB.findOne({"_id": taskID});
      console.log(deadline);

      deadlines.push(deadline);
    }

    ctx.body = deadlines;
  });


module.exports = router;
