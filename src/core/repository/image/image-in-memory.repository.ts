import { inject } from 'inversify';

import { ImageEntity } from '@/core/entity/image';
import { StoreProviderService } from '@/core/service/store-provider/store-provider.service';
import { ImageRepository } from '@/core/repository/image/image.repository';


const ALL_IMAGES: ImageEntity[] = [

  // LOGOS

  // SOCIALS

  new ImageEntity({
    id: 'logo-google',
    name: 'Google',
    url: 'assets/service-icons/logo-google.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-vk',
    name: 'Vk',
    url: 'assets/service-icons/logo-vk.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-twitter',
    name: 'Twitter',
    url: 'assets/service-icons/logo-twitter.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-tiktok',
    name: 'Tiktok',
    url: 'assets/service-icons/logo-tiktok.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-instagram',
    name: 'Instagram',
    url: 'assets/service-icons/logo-instagram.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-facebook',
    name: 'Facebook',
    url: 'assets/service-icons/logo-facebook.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-linkedin',
    name: 'Linkedin',
    url: 'assets/service-icons/logo-linkedin.svg',
    type: 'logo',
  }),

  // WORK & TOOLS

  new ImageEntity({
    id: 'logo-github',
    name: 'Github',
    url: 'assets/service-icons/logo-github.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-gitlab',
    name: 'Gitlab',
    url: 'assets/service-icons/logo-gitlab.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-jira',
    name: 'Jira',
    url: 'assets/service-icons/logo-jira.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-asana',
    name: 'Asana',
    url: 'assets/service-icons/logo-asana.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-bitbucket',
    name: 'Bitbucket',
    url: 'assets/service-icons/logo-bitbucket.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-trello',
    name: 'Trello',
    url: 'assets/service-icons/logo-trello.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-notion',
    name: 'Notion',
    url: 'assets/service-icons/logo-notion.svg',
    type: 'logo',
  }),

  // COMMUNICATION

  new ImageEntity({
    id: 'logo-discord',
    name: 'Discord',
    url: 'assets/service-icons/logo-discord.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-skype',
    name: 'Skype',
    url: 'assets/service-icons/logo-skype.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-slack',
    name: 'Slack',
    url: 'assets/service-icons/logo-slack.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-zoom',
    name: 'Zoom',
    url: 'assets/service-icons/logo-zoom.svg',
    type: 'logo',
  }),

  // ENTERTAINMENT

  new ImageEntity({
    id: 'logo-netflix',
    name: 'Netflix',
    url: 'assets/service-icons/logo-netflix.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-spotify',
    name: 'Spotify',
    url: 'assets/service-icons/logo-spotify.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-duolingo',
    name: 'Duolingo',
    url: 'assets/service-icons/logo-duolingo.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-xbox',
    name: 'Xbox',
    url: 'assets/service-icons/logo-xbox.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-steam',
    name: 'Steam',
    url: 'assets/service-icons/logo-steam.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-playstation',
    name: 'Playstation',
    url: 'assets/service-icons/logo-playstation.svg',
    type: 'logo',
  }),

  // OTHER SERVICES

  new ImageEntity({
    id: 'logo-yandex-disk',
    name: 'Yandex Disk',
    url: 'assets/service-icons/logo-yandex-disk.png',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-airbnb',
    name: 'Airbnb',
    url: 'assets/service-icons/logo-airbnb.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-amazon',
    name: 'Amazon',
    url: 'assets/service-icons/logo-amazon.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-aliexpress',
    name: 'Aliexpress',
    url: 'assets/service-icons/logo-aliexpress.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-deutsche-bahn',
    name: 'Deutsche-bahn',
    url: 'assets/service-icons/logo-deutsche-bahn.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-microsoft',
    name: 'Microsoft',
    url: 'assets/service-icons/logo-microsoft.svg',
    type: 'logo',
  }),
  new ImageEntity({
    id: 'logo-uber',
    name: 'Uber',
    url: 'assets/service-icons/logo-uber.svg',
    type: 'logo',
  }),

  // EMOJIS

  new ImageEntity({
    id: 'emoji-artist',
    name: 'Artist',
    url: 'assets/service-icons/emoji-artist.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-bank',
    name: 'Bank',
    url: 'assets/service-icons/emoji-bank.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-cap',
    name: 'Graduation cap',
    url: 'assets/service-icons/emoji-cap.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-case',
    name: 'Briefcase',
    url: 'assets/service-icons/emoji-case.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-dollar',
    name: 'Dollar',
    url: 'assets/service-icons/emoji-dollar.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-euro',
    name: 'Euro',
    url: 'assets/service-icons/emoji-euro.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-game',
    name: 'Game',
    url: 'assets/service-icons/emoji-game.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-island',
    name: 'Island',
    url: 'assets/service-icons/emoji-island.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-mountain',
    name: 'Mountain',
    url: 'assets/service-icons/emoji-mountain.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-plane',
    name: 'Plane',
    url: 'assets/service-icons/emoji-plane.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-scooter',
    name: 'Scooter',
    url: 'assets/service-icons/emoji-scooter.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-taxi',
    name: 'Taxi',
    url: 'assets/service-icons/emoji-taxi.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-train',
    name: 'Train',
    url: 'assets/service-icons/emoji-train.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-world',
    name: 'World',
    url: 'assets/service-icons/emoji-world.png',
    type: 'emoji',
  }),

  // ANIMALS

  new ImageEntity({
    id: 'emoji-bear',
    name: 'Bear',
    url: 'assets/service-icons/emoji-bear.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-panda',
    name: 'Panda',
    url: 'assets/service-icons/emoji-panda.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-koala',
    name: 'Koala',
    url: 'assets/service-icons/emoji-koala.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-boar',
    name: 'Boar',
    url: 'assets/service-icons/emoji-boar.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-cat',
    name: 'Cat',
    url: 'assets/service-icons/emoji-cat.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-cow',
    name: 'Cow',
    url: 'assets/service-icons/emoji-cow.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-dog',
    name: 'Dog',
    url: 'assets/service-icons/emoji-dog.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-fox',
    name: 'Fox',
    url: 'assets/service-icons/emoji-fox.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-horse',
    name: 'Horse',
    url: 'assets/service-icons/emoji-horse.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-monkey',
    name: 'Monkey',
    url: 'assets/service-icons/emoji-monkey.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-pig',
    name: 'Pig',
    url: 'assets/service-icons/emoji-pig.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-tiger',
    name: 'Tiger',
    url: 'assets/service-icons/emoji-tiger.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-wolf',
    name: 'Wolf',
    url: 'assets/service-icons/emoji-wolf.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-chicken',
    name: 'Chicken',
    url: 'assets/service-icons/emoji-chicken.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-mouse',
    name: 'Mouse',
    url: 'assets/service-icons/emoji-mouse.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-rabbit',
    name: 'Rabbit',
    url: 'assets/service-icons/emoji-rabbit.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-frog',
    name: 'Frog',
    url: 'assets/service-icons/emoji-frog.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-octopus',
    name: 'Octopus',
    url: 'assets/service-icons/emoji-octopus.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-whale',
    name: 'Whale',
    url: 'assets/service-icons/emoji-whale.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-dolphin',
    name: 'Dolphin',
    url: 'assets/service-icons/emoji-dolphin.png',
    type: 'emoji',
  }),
  new ImageEntity({
    id: 'emoji-unicorn',
    name: 'Unicorn',
    url: 'assets/service-icons/emoji-unicorn.png',
    type: 'emoji',
  }),

];


/**
 * @class ImageRepositoryInMemoryImpl
 * @extends ImageRepository
 * @public
 */
export class ImageRepositoryInMemoryImpl extends ImageRepository {

  public constructor(@inject(StoreProviderService) private store: StoreProviderService) {
    super();
  }

  public list(): Promise<ImageEntity[]> {
    const images = ALL_IMAGES;
    this.store.commit('images/setImages', images);
    return Promise.resolve(images);
  }

}
