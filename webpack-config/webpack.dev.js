const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = function (env) {
  console.log(env);
  return Merge(CommonConfig(env), {
    devServer: {
      contentBase: ROOT
    }
  })
};