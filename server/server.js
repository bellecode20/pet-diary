const express = require("express");
const app = express();

// app.listen(8080, function () {
//   console.log("listening on 8080");
// });
export default function handler(req, res) {
  app.listen(8080, function () {
    console.log("listening on 8080");
  });
  //   if (req.method === "POST") {
  //     // Process a POST request
  //   } else {
  //     // Handle any other HTTP method
  //   }
}
