const moment = require("moment");

// Middleware function
// Runs whenever a request is made
// We have access to certain parts of the URL with the request object.
const logger = (req, res, next) => {
  // console.log("Hello from middleware");
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

module.exports = logger;
