<template>
  <main class="unauthorized-layout">
    <slot></slot>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';


  @Component
  export default class UnauthorizedLayout extends Vue {
  }
</script>

<style scoped lang="scss">
  .unauthorized-layout {
    @include UiLayout();
    @include UiPadding(xl, top);
    @include UiPadding(xl, bottom);

    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
