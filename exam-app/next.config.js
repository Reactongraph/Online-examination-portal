module.exports = {
	publicRuntimeConfig: {
		SERVER_LINK: process.env.SERVER_LINK,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: {
				test: /\.(js|ts)x?$/,
				// for webpack 5 use
				// { and: [/\.(js|ts)x?$/] }
			},

			use: ['@svgr/webpack'],
		})

		return config
	},
}
