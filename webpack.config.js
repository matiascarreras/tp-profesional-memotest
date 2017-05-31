const util = require('util')
const fs = require('fs')

var path = require('path')
var webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const scriptTarget = process.env.npm_lifecycle_event

const TARGET = scriptTarget.split(':')[0]
console.log('TARGET',TARGET)

const ENV = (scriptTarget.split(':').length>1)?scriptTarget.split(':').pop(-1):'local'
console.log('ENV',ENV,'\n')

var publicPath, config
switch (ENV) {
	case 'local':
		publicPath = '/assets/'
	break;
	case 'dev':
		publicPath = 'https://www-dev.nearpod.us/' + Date.now() + '/assets/'
	break;
	case 'test':
		publicPath = 'https://www-test.nearpod.com/' + Date.now() + '/assets/'
	break;
	case 'prod':
		publicPath = 'https://www.nearpod.com/' + Date.now() + '/assets/'
	break;
}

if(TARGET === 'start' || !TARGET) {
	module.exports = {
		entry: {
			app: ['babel-polyfill', path.join(__dirname, 'src/index.jsx')],
		    vendor: [
		    	'react',
		    	'react-dom',
		    	'react-redux',
		    	'react-router',
		    	'redux',
		    	'redux-saga',
		    ]
		},
		output: {
			path: 'build/assets',
			publicPath: publicPath,
			filename: 'bundle.js'
		},
		resolve: {
			root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
			extensions: ['', '.js', '.jsx'],
		},
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: ['react', 'es2015', 'stage-0']
					}
				},
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader'
				},
				{
					test: /\.(png|gif|jpe?g|svg)$/i,
					loader: 'file?hash=sha512&digest=hex&name=media/image/[name]-[hash].[ext]'
				},
				{
					test: /\.(eot|ttf|woff|woff2)$/,
					loader: 'file?name=media/fonts/[name].[ext]'
				},
			]
		},
		devtool: 'inline-source-map',
		devServer: {
			historyApiFallback: {
				index: '/index.html'
			},
			hot: true,
			inline: true,
			progress: true,
			stats: 'errors-only',
			host: '0.0.0.0',
			port: 3000,
			watchOptions: {
		    	ignored: /node_modules/,
		    	aggregateTimeout: 300,
		    	poll: 1000
		   	},
		    disableHostCheck: true 
		},
		plugins: [
			new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
			new ExtractTextPlugin('main.css')
		]
	}
}

if(TARGET === 'build') {
	module.exports = {
		entry: {
			app: ['babel-polyfill', path.join(__dirname, 'src/index.jsx')],
		    vendor: [
		    	'react',
		    	'react-dom',
		    	'react-redux',
		    	'react-router',
		    	'redux',
		    	'redux-saga',
		    ]
		},
		output: {
			path: 'build/assets',
			publicPath: publicPath,
			filename: 'bundle.js'
		},
		resolve: {
			root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
			extensions: ['', '.js', '.jsx'],
		},
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: ['react', 'es2015', 'stage-0']
					}
				},
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader'
				},
				{
					test: /\.(png|gif|jpe?g|svg)$/i,
					loader: 'file?hash=sha512&digest=hex&name=media/image/[name]-[hash].[ext]'
				},
				{
					test: /\.(eot|ttf|woff|woff2)$/,
					loader: 'file?name=media/fonts/[name].[ext]'
				},
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				}
			}),
			new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				compress: { warnings: false },
				comments: false,
				sourceMap: false,
				mangle: true,
				minimize: true
			}),
	        new ExtractTextPlugin('main.css')
		]
	}

	fs.readFile('./src/index.html', function (err, data) {
		if (err) throw err;
		var newIndex = data.toString().replace(/\/assets\//g, publicPath)
		fs.writeFile('./build/index.html', newIndex, function(err) {
			if(err) {
				return console.log(err);
			}
		})
	})

	console.log(util.inspect(exports, {showHidden: false, depth: null, colors: true}), '\n')
}
