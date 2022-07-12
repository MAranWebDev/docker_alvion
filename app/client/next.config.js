/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,

	/* Fix for hotreload in docker */
	webpackDevMiddleware: (config) => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		};
		return config;
	},
};
