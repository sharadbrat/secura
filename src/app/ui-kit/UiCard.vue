<template>
  <div class="ui-card">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';


  /**
   * @class UiCard
   * @extends Vue
   * @public
   */
  @Component
  export default class UiCard extends Vue { }
</script>
<style scoped lang="scss">
  .ui-card {
    @include UiBorderRadius(md);
    box-shadow: UiShadow(1);
    background-color: UiColor(shade-100);
  }
</style>
