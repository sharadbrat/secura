<template>
  <div class="ui-group-avatars">
    <UiResponsiveImage
      class="ui-group-avatars__avatar"
      mode="contain"
      v-for="link in src"
      :key="link"
      :src="link"/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import UiResponsiveImage from '@/app/ui-kit/UiResponsiveImage.vue';


  /**
   * @class UiGroupAvatars
   * @extends Vue
   * @public
   */
  @Component({
    components: {
      UiResponsiveImage,
    },
  })
  export default class UiGroupAvatars extends Vue {

    @Prop() public src?: string[];

  }
</script>

<style lang="scss" scoped>

  .ui-group-avatars {
    display: flex;
    width: fit-content;


    &__avatar {
      width: $grid-step * 10;
      height: $grid-step * 10;
      border-radius: 100%;
    }

    &__avatar:not(:last-child) {
      @include UiMargin(md, right);
    }
  }
</style>
