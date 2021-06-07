const { gitDescribeSync } = require('git-describe');
const { version } = require('./package.json');

process.env.VUE_APP_VERSION = `v${version}.${gitDescribeSync().hash}`;


module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/framework/_index.scss";',
      },
    },
  },
  devServer: {
    disableHostCheck: true,
  },
  lintOnSave: 'warning',
};
