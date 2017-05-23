const frisby = require("frisby");

const SCHEME = "http";
const HOST = "localhost";
const PORT = "3000";
const USERID = "R0V7HfEavaVQGhCx";

const URL = SCHEME + "://" + HOST + ":" + PORT + "/";


frisby
.create("/:userID/status ValidUserID").get(
  URL + USERID + "/status"
)
.expectHeaderContains("content-type", "application/json")
.expectStatus(200)
.expectJSON(
  [
    {
        "_id": "RaDImKri6JhU899p",
        "deadline": "061"
    },
    {
        "_id": "d2h0eXmyK9xNuj0X",
        "deadline": "0524"
    }
  ]
).toss();

frisby
.create("/:userID/status InvalidUserID").get(
  URL + "tanishi" + "/status"
)
.expectHeaderContains("content-type", "application/json")
.expectStatus(200)
.expectJSON(
    []
).toss();

frisby
.create("/:userID/status InvalidUserID").post(
  URL + "tanishi" + "/status"
)
.expectHeaderContains("content-type", "text/plain; charset=utf-8")
.expectStatus(405)
.toss();

