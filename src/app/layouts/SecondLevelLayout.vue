<template>
  <div class="second-level-layout">

    <div class="second-level-layout__header">
      <header class="second-level-layout__fixed-header">
        <div class="second-level-layout__header-container">
          <a :href="backUrl" title="Go back" @click="$event.preventDefault();$router.back();">
            <UiButton
              type="subdued"
              aria-label="Back"
              width="shrink"
              shape="circled"
              size="sm"
            >
              <UiIcon name="arrow-left-long"/>
            </UiButton>
          </a>

          <h1 class="second-level-layout__heading">
            {{title}}
          </h1>
        </div>
      </header>
    </div>


    <main class="second-level-layout__main">
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import { State } from 'vuex-class';

  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiIcon from '@/app/ui-kit/UiIcon.vue';


  @Component({
    components: {
      UiButton,
      UiIcon,
    },
  })
  export default class SecondLevelLayout extends Vue {

    @Prop() public title: string;

    @Prop() public backUrl: string;

    @State(state => state.keys.masterKey)
    public masterKey: string;

    mounted() {
      if (!this.masterKey) {
        this.$router.replace('/');
      }
    }

  }
</script>

<style scoped lang="scss">
  .second-level-layout {

    display: flex;
    flex-direction: column;
    height: 100%;

    &__main {
      @include UiMargin(lg, top);
      @include UiMargin(lg, bottom);
      @include UiLayout();
      @include UiPadding(lg, bottom);

      flex-grow: 1;
    }

    &__header {
      height: $grid-step * 20; // 80px
      flex-shrink: 0;

      @include UiMediaMobile() {
        height: $grid-step * 15; // 60px
      }
    }

    &__fixed-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      width: 100%;

      @include UiTheme() {
        border-bottom: 1px solid UiColor(shade-400);
      }
    }

    &__header-container {
      @include UiLayout();

      display: flex;
      align-items: center;
      height: $grid-step * 20; // 80px

      @include UiTheme() {
        background-color: UiColor(shade-100);
      }

      @include UiMediaMobile() {
        height: $grid-step * 15; // 60px
      }
    }

    &__heading {
      @include UiTypographyHeading2();
      @include UiMargin(md, left);
    }

  }
</style>
