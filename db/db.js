"use strict";

const DataStore = require("nedb-promise");

const taskDB = new DataStore({
  filename: "./db/task.db",
  autoload: true
});

const assignDB = new DataStore({
  filename: "./db/assign.db",
  autoload: true
});

const userDB = new DataStore({
  filename: "./db/user.db",
  autoload: true
});

const db = {
  "userDB": userDB,
  "taskDB": taskDB,
  "assignDB": assignDB
};

module.exports = db;

