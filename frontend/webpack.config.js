const child = require('child_process');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development';
const gqlUrl = process.env.GQL_URL || 'http://localhost:3500';
const port = process.env.PORT || 3000;
const buildDir = path.join(__dirname, 'build');
const backendSrc = path.join(__dirname, '..', 'backend', 'src');

// BACKEND PATH
if (!fs.existsSync(backendSrc)) {
  console.error('Expected to find backend src @ ' + backendSrc);
  process.exit(1);
}

// GIT HASH
let gitHash = 'none';

try {
  const dirtyCode = child
    .execSync('git diff --quiet HEAD')
    .toString()
    .replace('\n', '');
  // console.log('dirtyCode', dirtyCode);
  gitHash = child
    .execSync('git rev-parse HEAD')
    .toString()
    .replace('\n', '');
  if (dirtyCode) {
    gitHash += '-dirty';
  }
} catch (err) {
  console.log(`Problem getting last commit hash, make sure git is installed`);
  console.error(err);
}

console.log(
  `
********** WEBPACK ***************************************
build mode: ${process.env.NODE_ENV}
buildDir:   ${buildDir}
gitHash:    ${gitHash}
gqlUrl:     ${gqlUrl}
**********************************************************
`,
);

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    bundle: './src/index.tsx',
  },
  output: {
    path: buildDir,
    filename: isDev ? 'bundle.js' : '[hash].bundle.js',
    publicPath: '/',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
  },
  devtool: isDev ? 'inline-source-map' : false, // 'source-map',
  devServer: {
    host: '0.0.0.0', // others connect to service
    port: port,
    https: false,
    contentBase: buildDir,
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: {
      '/gql': {
        target: gqlUrl, // proxied gql end-point
        pathRewrite: { '^/gql': '' },
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      // typescript
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-class-properties',
                'react-hot-loader/babel',
              ],
              presets: [
                ['@babel/env', { targets: { browsers: 'last 2 versions' } }],
                '@babel/typescript',
                '@babel/react',
              ],
            },
          },
        ],
      },
      // markdown
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'markdown-loader',
          },
        ],
      },
      // images (url loader)
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[hash:8].[ext]',
        },
      },
      // svg
      {
        test: /\.svg$/,
        issuer: {
          test: /\.tsx?$/,
        },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [{ inlineStyles: { onlyMatchedOnce: false } }],
              },
            },
          },
        ], // svg -> react component
      },
      // other files (file loader)
      {
        exclude: [/\.(js|ts|tsx|css|less|mjs|html|md|png|jpe?g|gif|json|ejs|svg)$/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.mjs', '.json', '.md'],
    // resolveModules = [ './src', path.join(__dirname, 'node_modules')]
    // tsconfig.compilerOptions.paths should sync with these
    alias: {
      src: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      // styles: path.resolve(__dirname, 'src/styles'),
      // utils: path.resolve(__dirname, 'src/utils'),
      static: path.resolve(__dirname, 'src/static'),
      backend: path.resolve(backendSrc),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin([buildDir]),
    // see typings/webpack.d.ts
    new webpack.DefinePlugin({
      GQL_URL: JSON.stringify(gqlUrl),
      GIT_HASH: JSON.stringify(gitHash),
    }),
    new HtmlWebpackPlugin({
      template: './src/static/index.html',
    }),
    !isDev ? new ForkTsCheckerWebpackPlugin() : null,
  ].filter(Boolean),
};
