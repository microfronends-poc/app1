const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, { mode }) => {
	const production = mode === 'production';

	return {
		entry: production ? path.resolve(__dirname, 'src/root.js') : path.resolve(__dirname, 'src/app.js'),
		output: {
			filename: production ? '@mf-app1.js' : 'app1.js',
			libraryTarget: production ? 'system' : undefined,
			path: path.resolve(__dirname, 'dist'),
		},
		devtool: production ? 'none'  : 'sourcemap',
		resolve: {
			extensions: ['.js', '.jsx']
		},
		module: {
			rules: [
				{ parser: { system: false } },
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: [{ loader: 'babel-loader' }]
				},
				{
					test: /\.html$/,
					use: [{ loader: 'html-loader' }]
				}
			],
		},
		devServer: {
			historyApiFallback: true,
			disableHostCheck: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		},
		plugins: [
			new CleanWebpackPlugin(),
			new BundleAnalyzerPlugin({
				analyzerMode: 'static'
			})
		].concat(production ? [
				new HtmlWebpackPlugin({
					template: 'src/index.html',
					filename: './index.html'
				})
			] : []
		),
		externals: production ? ['react', 'react-dom'] : [],
	};
};