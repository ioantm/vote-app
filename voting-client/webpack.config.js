var webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
	    './src/index.jsx'
	],
	module: {
		loaders: [{
	    	test: /\.jsx?$/,
	      	exclude: /node_modules/,
	      	loader: 'react-hot!babel'
    	}]
	},
	resolve: {
    	extensions: ['', '.js', '.jsx']
  	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
	 	new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
}