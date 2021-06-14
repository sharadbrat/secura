<template>
  <ul class="errors-list" v-if="errors && errors.length">
    <li
      class="errors-list__item"
      v-for="error in errors"
      :key="error"
    >
      {{error}}
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';


  @Component
  export default class ErrorsList extends Vue {

    @Prop() public errors!: string[];

  }
</script>

<style scoped lang="scss">
  .errors-list {
    @include UiPadding(sm);
    @include UiBorderRadius(md);

    width: 100%;

    @include UiTheme() {
      color: UiColor(negative);
      border: 1px solid UiColor(negative);
    }

    &__item {
      @include UiMargin(sm, left);
      @include UiTypographyBodyMid();
      list-style: disc outside;
      &:not(:last-child) {
        @include UiMargin(xxs, bottom);
      }
    }
  }
</style>
