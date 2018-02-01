var webpack = require("webpack");
var path = require("path");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HappyPack = require('happypack');
var happyPackThreadPool = HappyPack.ThreadPool({ size: 5 })
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// var debug = process.env.ENV !== "production";
// config: path.join(__dirname, './config/' + process.env.ENV + '.js')

console.log("__dirname is:" + __dirname);
module.exports = {
	context: path.resolve(__dirname, "_src/Scripts/NCI"),
	// devtool: debug ? "inline-sourcemap" : null,
	// TODO: Add CDN paths
	entry: {
		// Vendor:                   [
		//                             'modernizr'
		//                             // 'jquery-ui/ui/widgets/accordion',
		//                             // 'jquery-ui/ui/widgets/autocomplete',
		//                             // 'jquery-ui/ui/widgets/dialog',
		//                             // 'jquery-ui/ui/widgets/selectmenu',
		//                             // 'jquery-ui/ui/widgets/tooltip',
		//                             // 'jquery-ui',
		//                             // 'jquery'
		//                           ],
		//This is the Babel polyfill module that includes all the es2015 polyfills.
		//"Babel-Polyfill":       'babel-polyfill',
		CommonBase:             ['modernizr','./UX/Common/Common'],
		ContentPage:            './UX/Common/ContentPage',
		CTHPPage:               './UX/PageSpecific/CTHP/CTHPPage',
		HomePage:               './UX/PageSpecific/Home/HomePage',
		InnerPage:              './UX/PageSpecific/Inner/InnerPage',
		LandingPage:            './UX/PageSpecific/Landing/LandingPage',
		PDQPage:                './UX/PageSpecific/PDQ/PDQPage',
		TopicPage:              './UX/PageSpecific/Topic/TopicPage',
		Popups:                 './UX/PageSpecific/Popups/Popups',
		AdvancedCTSSearchPage:  './UX/AppModuleSpecific/BasicCTS/Search/AdvancedCTSSearchPage',
		SimpleCTSSearchPage:	'./UX/AppModuleSpecific/BasicCTS/Search/SimpleCTSSearchPage',
		BasicCTSResultsPage:    './UX/AppModuleSpecific/BasicCTS/Results/BasicCTSResultsPage',
		BasicCTSViewPage:       './UX/AppModuleSpecific/BasicCTS/View/BasicCTSViewPage',
		BasicCTSPrintPage:      './UX/AppModuleSpecific/BasicCTS/Print/BasicCTSPrintPage',
		CTListingPage:          './UX/AppModuleSpecific/BasicCTS/Listing/CTListingPage',
		DictionaryPage:         './UX/AppModuleSpecific/Dictionary/DictionaryPage',
		BlogPostPage:           './UX/PageSpecific/BlogPost/BlogPostPage',
		BlogSeriesPage:         './UX/PageSpecific/BlogSeries/BlogSeriesPage',
		Charts:                 './UX/Common/Enhancements/charts',
		NCIAnalyticsFunctions:  './analytics/NCIAnalyticsFunctions.js',
		s_code:                 './analytics/s_code',
		wa_wcms_pre:            './analytics/wa_wcms_pre'
	},
	target: 'web',
	resolve: {
		modules: [
			'_src/Scripts/NCI', 
			'node_modules'
		],
		alias: {
			Common:         'UX/Common',
			CTHP:           'UX/PageSpecific/CTHP',
			Inner:          'UX/PageSpecific/Inner',
			Home:           'UX/PageSpecific/Home',
			PDQ:            'UX/PageSpecific/PDQ',
			BasicCTSCommon: 'UX/AppModuleSpecific/BasicCTS/Common',
			BasicCTSSearch: 'UX/AppModuleSpecific/BasicCTS/Search',
			BasicCTSView:   'UX/AppModuleSpecific/BasicCTS/View',
			BasicCTS:       'UX/AppModuleSpecific/BasicCTS',
			Dictionary:     'UX/AppModuleSpecific/Dictionary',			
			Patches:        'Patches',
			Modules:        'Modules',
			Charts:         'UX/Common/Enhancements/charts',
			StyleSheets:	path.resolve(__dirname, '_src', 'StyleSheets'),

			// vendor scripts
			// jquery$: '//code.jquery.com/jquery-3.1.1.min.js',
			// 'jquery-ui': '//code.jquery.com/ui/1.12.1/jquery-ui.min.js',
			modernizr$: path.resolve(__dirname, "./.modernizrrc"),

			// vendor jQuery plugins
			'jquery/megamenu$': 'Vendor/jquery-accessibleMegaMenu',
			'jquery/scrollToFixed$': 'Vendor/jquery-scrolltofixed'
			// throttle: 'throttle-debounce/throttle'

		},
		extensions: [".ts", ".tsx", ".js"]
	},
	externals: {
		jquery: 'jQuery',
		jQuery: 'jQuery',
		'jquery-ui': 'jQuery.ui',
		CDEConfig: 'CDEConfig'
	},

	module: {
		rules: [
			// JavaScript Linter
			// {
			//     test: /\.js$/,
			//     enforce: 'pre',
			//     exclude: /node_modules/,
			//     loader: "eslint-loader",
			//     options: {
			//         failOnWarning: false,
			//         failOnError: false,
			//         emitWarning: true
			//     }
			// },
			// TypeScript Linter
			// {
			//     test: /\.tsx?$/,
			//     enforce: 'pre',
			//     loader: 'tslint-loader',
			//     options: {
			//         configFile: 'tslint.json',
			//         failOnHint: false, // stop the build on fail
			//         fix: false // do you dare make this true?
			//     }
			// },

			// The loader below passes off any required/imported .ts files off to the the typescript loader,
			// this transpiles the TS to ES2015 Javascri[t, which is then handed off to Babel
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			{ test: /\.h(andle)?b(ar)?s$/i, loader: "handlebars-loader" },
			{ test: /\.modernizrrc$/, loader: "expose-loader?Modernizr!modernizr-loader!json-loader" },
			{ 
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'happyPack/loader?id=js'
			},
			{
				test: /\.s?css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'happyPack/loader?id=styles'
				})
			},

			// expose the charts module to a global variable
			{
				test: path.resolve(__dirname,'./_src/Scripts/NCI/UX/Common/Enhancements/charts'),
				use: [{
					loader: 'expose-loader',
					options: 'Chart' // global variable name
				}]
			}

		]
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, "_dist/js")
	},
	plugins: [
		new webpack.ProvidePlugin({
			Modernizr: "modernizr",
			Chart: 'Charts'
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'shared',
			chunks: ['BlogPostPage', 'BlogSeriesPage', 'ContentPage', 'CTHPPage', 'CTListingPage', 'HomePage', 'InnerPage', 'LandingPage', 'PDQPage', 'TopicPage', 'Popups'],
			minChunks: 3
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'Common',
			chunks: ['CommonBase','shared'],
			minChunks: 1
		}),

		new ExtractTextPlugin({
			filename: getPath => {
				return getPath('[name]') === 'Common' ? getPath('../Styles/nvcg.css') : getPath('../Styles/PageSpecific/[name].css')
			}
		}),
		new HappyPack({
			id: 'js',
			threadPool: happyPackThreadPool,
			loaders: ['babel-loader']
		}),
		new HappyPack({
			id: 'styles',
			threadPool: happyPackThreadPool,
			loaders: ['css-loader', 'postcss-loader', 'sass-loader']
		}),
		new HardSourceWebpackPlugin(),
	]
};
