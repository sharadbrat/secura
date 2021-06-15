/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'secura-cache';
const urlsToCache = [
  'https://secura.netlify.app/',

  // Sources
  'index.html',
  'js/app.js',
  'js/chunk-vendors.js',
  'css/app.css',

  // Favicons
  'assets/favicons/apple-touch-icon-57x57.png',
  'assets/favicons/apple-touch-icon-60x60.png',
  'assets/favicons/apple-touch-icon-72x72.png',
  'assets/favicons/apple-touch-icon-76x76.png',
  'assets/favicons/apple-touch-icon-114x114.png',
  'assets/favicons/apple-touch-icon-120x120.png',
  'assets/favicons/apple-touch-icon-144x144.png',
  'assets/favicons/apple-touch-icon-152x152.png',
  'assets/favicons/favicon-16x16.png',
  'assets/favicons/favicon-32x32.png',
  'assets/favicons/favicon-96x96.png',
  'assets/favicons/favicon-128x128.png',
  'assets/favicons/favicon-196x196.png',
  'assets/favicons/favicon.ico',
  'assets/favicons/ms-tile-70x70.png',
  'assets/favicons/ms-tile-144x144.png',
  'assets/favicons/ms-tile-150x150.png',
  'assets/favicons/ms-tile-310x310.png',
  'assets/favicons/safari-pinned-tab.svg',

  // App Icons
  'assets/icons/icon-72x72.png',
  'assets/icons/icon-96x96.png',
  'assets/icons/icon-128x128.png',
  'assets/icons/icon-144x144.png',
  'assets/icons/icon-152x152.png',
  'assets/icons/icon-192x192.png',
  'assets/icons/icon-384x384.png',
  'assets/icons/icon-512x512.png',

  // App Launch screens
  'assets/launch-screens/launch-screen-640x1136.png',
  'assets/launch-screens/launch-screen-750x1334.png',
  'assets/launch-screens/launch-screen-828x1792.png',
  'assets/launch-screens/launch-screen-1125x2436.png',
  'assets/launch-screens/launch-screen-1242x2208.png',
  'assets/launch-screens/launch-screen-1242x2688.png',
  'assets/launch-screens/launch-screen-1536x2048.png',
  'assets/launch-screens/launch-screen-1668x2224.png',
  'assets/launch-screens/launch-screen-1668x2388.png',
  'assets/launch-screens/launch-screen-2048x2732.png',

  // Illustrations

  'assets/illustrations/download.svg',
  'assets/illustrations/empty.svg',
  'assets/illustrations/install.svg',
  'assets/illustrations/me.jpeg',
  'assets/illustrations/secure.svg',

  // Images
  'assets/service-icons/emoji-artist.png',
  'assets/service-icons/emoji-bank.png',
  'assets/service-icons/emoji-bear.png',
  'assets/service-icons/emoji-boar.png',
  'assets/service-icons/emoji-cap.png',
  'assets/service-icons/emoji-case.png',
  'assets/service-icons/emoji-cat.png',
  'assets/service-icons/emoji-chicken.png',
  'assets/service-icons/emoji-cow.png',
  'assets/service-icons/emoji-dog.png',
  'assets/service-icons/emoji-dollar.png',
  'assets/service-icons/emoji-dolphin.png',
  'assets/service-icons/emoji-euro.png',
  'assets/service-icons/emoji-fox.png',
  'assets/service-icons/emoji-frog.png',
  'assets/service-icons/emoji-game.png',
  'assets/service-icons/emoji-horse.png',
  'assets/service-icons/emoji-island.png',
  'assets/service-icons/emoji-koala.png',
  'assets/service-icons/emoji-monkey.png',
  'assets/service-icons/emoji-mountain.png',
  'assets/service-icons/emoji-mouse.png',
  'assets/service-icons/emoji-octopus.png',
  'assets/service-icons/emoji-panda.png',
  'assets/service-icons/emoji-pig.png',
  'assets/service-icons/emoji-plane.png',
  'assets/service-icons/emoji-rabbit.png',
  'assets/service-icons/emoji-scooter.png',
  'assets/service-icons/emoji-taxi.png',
  'assets/service-icons/emoji-tiger.png',
  'assets/service-icons/emoji-train.png',
  'assets/service-icons/emoji-unicorn.png',
  'assets/service-icons/emoji-whale.png',
  'assets/service-icons/emoji-wolf.png',
  'assets/service-icons/emoji-world.png',
  'assets/service-icons/logo-airbnb.svg',
  'assets/service-icons/logo-aliexpress.svg',
  'assets/service-icons/logo-amazon.svg',
  'assets/service-icons/logo-asana.svg',
  'assets/service-icons/logo-bitbucket.svg',
  'assets/service-icons/logo-deutsche-bahn.svg',
  'assets/service-icons/logo-discord.svg',
  'assets/service-icons/logo-duolingo.svg',
  'assets/service-icons/logo-facebook.svg',
  'assets/service-icons/logo-github.svg',
  'assets/service-icons/logo-gitlab.svg',
  'assets/service-icons/logo-google.svg',
  'assets/service-icons/logo-instagram.svg',
  'assets/service-icons/logo-jira.svg',
  'assets/service-icons/logo-linkedin.svg',
  'assets/service-icons/logo-microsoft.svg',
  'assets/service-icons/logo-netflix.svg',
  'assets/service-icons/logo-notion.svg',
  'assets/service-icons/logo-playstation.svg',
  'assets/service-icons/logo-skype.svg',
  'assets/service-icons/logo-slack.svg',
  'assets/service-icons/logo-spotify.svg',
  'assets/service-icons/logo-steam.svg',
  'assets/service-icons/logo-tiktok.svg',
  'assets/service-icons/logo-trello.svg',
  'assets/service-icons/logo-twitter.svg',
  'assets/service-icons/logo-uber.svg',
  'assets/service-icons/logo-vk.svg',
  'assets/service-icons/logo-xbox.svg',
  'assets/service-icons/logo-yandex-disk.png',
  'assets/service-icons/logo-youtube.svg',
  'assets/service-icons/logo-zoom.svg',

  // Fonts
  'img/roboto-v20-cyrillic-500.svg',
  'img/roboto-v20-cyrillic-700.svg',
  'img/roboto-v20-cyrillic-regular.svg',
  'img/roboto-v20-latin-500.svg',
  'img/roboto-v20-latin-700.svg',
  'img/roboto-v20-latin-regular.svg',
  'fonts/roboto-v20-cyrillic-500.eot',
  'fonts/roboto-v20-cyrillic-500.ttf',
  'fonts/roboto-v20-cyrillic-500.woff',
  'fonts/roboto-v20-cyrillic-500.woff2',
  'fonts/roboto-v20-cyrillic-700.eot',
  'fonts/roboto-v20-cyrillic-700.ttf',
  'fonts/roboto-v20-cyrillic-700.woff',
  'fonts/roboto-v20-cyrillic-700.woff2',
  'fonts/roboto-v20-cyrillic-regular.eot',
  'fonts/roboto-v20-cyrillic-regular.ttf',
  'fonts/roboto-v20-cyrillic-regular.woff',
  'fonts/roboto-v20-cyrillic-regular.woff2',
  'fonts/roboto-v20-latin-500.eot',
  'fonts/roboto-v20-latin-500.ttf',
  'fonts/roboto-v20-latin-500.woff',
  'fonts/roboto-v20-latin-500.woff2',
  'fonts/roboto-v20-latin-700.eot',
  'fonts/roboto-v20-latin-700.ttf',
  'fonts/roboto-v20-latin-700.woff',
  'fonts/roboto-v20-latin-700.woff2',
  'fonts/roboto-v20-latin-regular.eot',
  'fonts/roboto-v20-latin-regular.ttf',
  'fonts/roboto-v20-latin-regular.woff',
  'fonts/roboto-v20-latin-regular.woff2',
];

self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName)),
      )),
  );
});
