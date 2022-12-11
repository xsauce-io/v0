/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
		  {
			protocol: 'https',
			hostname: 'image.goat.com',
			},
			{
				protocol: 'https',
				hostname: 'images.stockx.com',
			  },
		],
	  },
};
