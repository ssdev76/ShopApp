const path = require('path');
const argv = require('yargs').argv;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;
const distPath = path.join(__dirname, '/public');
 
const config = {
  devtool: "source-map",
  entry: "./src/index.js",
  output:{
    filename: "bundle.js",
    path: distPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
            presets:["env", "react", "es2015", "stage-0"]
        }
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name][hash].[ext]'
          }
        }
      }
    ]
  },
	optimization: isProduction ? {
		minimizer: [
			new UglifyJsPlugin({
				sourceMap: true,
				uglifyOptions: {
					mangle: true,
					compress: {
						inline: false,
						warnings: false,
						drop_console: true,
						unsafe: true
					},
				},
			}),
		],
	} : {},
  devServer: {
    contentBase: distPath,
    port: 9000,
    compress: true,
    open: true
  }
};

module.exports = config;