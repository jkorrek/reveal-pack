#!/usr/bin/env node

const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config");

const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, {
	stats: {
		colors: true
	}
});

server.listen(8080, "127.0.0.1", function() {
	console.log("Starting server on http://localhost:8080");
});