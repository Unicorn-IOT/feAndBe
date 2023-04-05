// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
	typescript: {
		tsconfigPath: '../tsconfig.json',
	},
	experimental: {
		externalDir: true,
	},

	webpack: (config) => {
		const svgFileLoader = config.module.rules.find((rule) => rule?.test?.test('.svg'));
		if (svgFileLoader) {
			svgFileLoader.exclude = /\.inline\.svg$/;
		}

		config.module.rules.push({
			test: /\.inline\.svg$/,
			issuer: { and: [/\.(js|ts)x?$/] },
			use: [{ loader: '@svgr/webpack', options: { memo: true, icon: true } }],
		});

		config.resolve.alias = {
			...config.resolve.alias,
			classnames: 'clsx',
		};

		return config;
	},
};

module.exports = nextConfig;
