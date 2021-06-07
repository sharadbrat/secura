<template>
  <UiResponsiveImage
    class="user-avatar"
    mode="cover"
    :src="srcWithDefault"
  />
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import UiResponsiveImage from '@/app/ui-kit/UiResponsiveImage.vue';


  @Component({
    components: {
      UiResponsiveImage,
    },
  })
  export default class UserAvatar extends Vue {

    private static readonly defaultSrc = "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='40' rx='20' fill='%23ADD3FF'/%3E%3Cpath d='M19.9998 21C23.6832 21 26.6665 18.0167 26.6665 14.3334C26.6665 10.65 23.6832 7.66669 19.9998 7.66669C16.3165 7.66669 13.3332 10.65 13.3332 14.3334C13.3332 18.0167 16.3165 21 19.9998 21ZM19.9998 24.3333C15.5498 24.3333 6.6665 26.5667 6.6665 31V40H33.3332V31C33.3332 26.5667 24.4498 24.3333 19.9998 24.3333Z' fill='%2356A4FF'/%3E%3C/svg%3E%0A";

    @Prop() public src: string;

    public get srcWithDefault() {
      return this.src || UserAvatar.defaultSrc;
    }

  }
</script>

<style scoped lang="scss">
  .user-avatar {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    flex-shrink: 0;
  }
</style>
