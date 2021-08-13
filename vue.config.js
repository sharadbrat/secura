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
  pwa: {
    name: 'Secura',
    msTileColor: '#29b6f6',
    themeColor: 'transparent',
    manifestOptions: {
      name: 'Secura',
      short_name: 'Secura',
      start_url: 'https://secura.netlify.app/',
      description: 'Secura: Headless password manager',
      display: 'standalone',
      orientation: 'portrait',
      theme_color: '#transparent',
      background_color: '#29b6f6',
      icons: [
        {
          src: 'assets/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'assets/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'assets/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: 'assets/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    iconPaths: {
      favicon32: 'assets/icons/favicon-32x32.png',
      favicon16: 'assets/icons/favicon-16x16.png',
      appleTouchIcon: 'assets/icons/apple-touch-icon-152x152.png',
      maskIcon: 'assets/icons/safari-pinned-tab.svg',
      msTileImage: 'assets/icons/ms-tile-144x144.png',
    },
    appleMobileWebAppCapable: 'yes',
    workboxOptions: {
      navigateFallback: 'index.html',
    },
  },
};
