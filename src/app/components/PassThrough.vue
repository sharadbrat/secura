<template>
  <router-view />
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';


  /**
   * This component is needed to create empty parent view for router.
   * @class PassThrough
   * @extends Vue
   * @public
   */
  @Component
  export default class PassThrough extends Vue {
  }
</script>
