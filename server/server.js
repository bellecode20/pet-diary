const express = require("express");
const app = express();

export default function handler(req, res) {
  app.listen(8080, function () {
    console.log("listening on 8080");
  });
}
