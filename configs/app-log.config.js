const env = require("dotenv");
env.config({ path: process.env.NODE_ENV === "production" ? ".env" : ".env.local" });
const dest = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  filter(data) {
    // logic can be added here to determine if the data should be logged
    // refer to https://www.npmjs.com/package/@vrbo/pino-rotating-file

    // Do not log if data do not contain http request
    return !data.req;
  },
  output: {
    path: "app.log", // name of file
    options: {
      path: `./logs/${dest}/app`, // path to write files to
      size: "2M", // max file size
      interval: "1d", // rotate daily
      teeToStdout: process.env.NODE_ENV !== "production" // writes file content to stdout as well.
    }
  }
};
