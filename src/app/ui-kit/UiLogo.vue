<template>
  <figure
    aria-label="TravelMap logo"
    class="ui-logo"
  >
    APP LOGO
  </figure>
</template>


<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';


  export type UiLogoType = 'small' | 'big';


  @Component
  export default class UiLogo extends Vue {

  }
</script>


<style lang="scss" scoped>
  .ui-logo {
    > svg {
      height: 100%;
    }
  }
</style>
