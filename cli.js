#!/usr/bin/env node

const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const getEnv = () => {
	return {
		slideFolder: path.resolve(process.cwd(), 'slides')
	};
}

const webpackBuild = () => {
	const prodConfig = require('./webpack-config/webpack.prod')(Object.assign(getEnv(), {
		output: 'build'
	}));

	webpack(prodConfig, (err, stats) => {
		if (err || stats.hasErrors()) {
			console.log('Build failed :(');
			if (err != null) {
				console.error(err);
			}

			const info = stats.toJson();
			if (stats.hasErrors()) {
				console.error(info.errors);
			}
		} else {
			console.log('Build success :)');
		}
	});
}

const startDevServer = () => {
	const devConfig = require('./webpack-config/webpack.dev')(getEnv());

	const compiler = webpack(devConfig);
	const server = new webpackDevServer(compiler, {
		stats: {
			colors: true
		}
	});

	server.listen(8080, '127.0.0.1', function () {
		console.log('Starting server on http://localhost:8080');
	})
}

require('yargs')
	.usage('$0 <cmd> [args]')
	.command('watch', 'starts a dev version', {

	}, function (argv) {
		console.log('Start watching!');
		startDevServer();
	})
	.command('build', 'build a release vesrion', {

	}, function (argv) {
		console.log('Start build!');
		webpackBuild();
	})
	.help()
	.argv;