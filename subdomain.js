#!/usr/bin/env node

// eslint-disable-next-line no-var
var subdomain = "";

if (process.env.SUBDOMAIN) {
	subdomain = process.env.SUBDOMAIN;
}

if (typeof process !== "undefined") {
	// eslint-disable-next-line no-console
	console.log(process.argv[2] === "--full-url" ? `https://${subdomain}.loca.lt` : subdomain);
}

module.exports = { subdomain };
