module.exports = {
  outputDir: '../docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
  devServer: {
	  host: '0.0.0.0',
	  port: '8006',
	  https: false,
	  hotOnly: true,
	  proxy: {
		  "/upload": {
			  target: 'http://192.168.1.168:3000',
			  changeOrigin: true,
			  ws: false,
			  secure: false
		  }
	  }
  }
};
