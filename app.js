"use strict";

const Koa = require("koa");
const app = new Koa();

const Pug = require("koa-pug");
const pug = new Pug({
  app: app,
  viewPath: "./views",
  basedir: "./views"
});

const Router = require("koa-router");
const router = new Router();
app.use(router.routes());

router.get("/", async (ctx, next) => {
  ctx.render("index", {name: "tanishi"});
})

app.listen(3000);
