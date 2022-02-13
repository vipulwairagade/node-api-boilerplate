const env = require("dotenv");
env.config({
	path: process.env.NODE_ENV === "production" ? ".env" : ".env.local"
});
const dest = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
	filter(data) {
		// logic can be added here to determine if the data should be logged
		// refer to https://www.npmjs.com/package/@vrbo/pino-rotating-file

		// Log if data do not contain http request
		return Boolean(data.req);
	},
	output: {
		path: "http-request.log", // name of file
		options: {
			path: `./logs/${dest}/http-request`, // path to write files to
			size: "2M", // max file size
			interval: "1d", // rotate daily
			teeToStdout: process.env.NODE_ENV !== "production" // writes file content to stdout as well.
		}
	}
};
