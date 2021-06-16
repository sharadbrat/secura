<template>
  <header class="header">
    <div class="header__fixed-header">
      <div class="header__container">

        <UiLogo class="header__logo"/>

        <UiButton
          v-if="items && items.length > 0"
          class="ui-hide_desktop"
          size="sm"
          type="transparent"
          shape="circled"
          width="shrink"
          aria-label="Menu"
          @click="handleToggleMobileNav()"
        >
          <UiIcon name="menu"/>
        </UiButton>

        <nav class="header__nav-items">

          <router-link
            v-for="item in items"
            class="header__link"
            active-class="header__link_is-active"
            :to="item.url"
            :key="item.url"
          >
            <UiIcon class="header__link-icon" :name="item.icon"/>
            {{item.title}}
          </router-link>

        </nav>

      </div>
    </div>

    <div
      v-if="items && items.length > 0"
      class="header__mobile-nav"
      :class="{ 'header__mobile-nav_is-expanded': isMobileNavExpanded }"
    >
      <nav class="header__mobile-nav-block">
        <div class="header__mopbile-nav-row">
          <UiLogo/>

          <UiButton
            size="sm"
            type="transparent"
            shape="circled"
            width="shrink"
            aria-label="Close menu"
            @click="handleToggleMobileNav()"
          >
            <UiIcon name="close"/>
          </UiButton>
        </div>

        <router-link
          v-for="item in items"
          class="header__link"
          active-class="header__link_is-active"
          :to="item.url"
          :key="item.url"
          @click.native="handleToggleMobileNav"
        >
          <UiIcon class="header__link-icon" :name="item.icon"/>
          {{item.title}}
        </router-link>
      </nav>
    </div>
  </header>
</template>


<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  import UiLogo from '@/app/ui-kit/UiLogo.vue';
  import UiIcon from '@/app/ui-kit/UiIcon.vue';
  import UiButton from '@/app/ui-kit/UiButton.vue';


  export interface NavigationItem {
    url: string;
    title: string;
    icon: string;
  }


  @Component({
    components: {
      UiLogo,
      UiIcon,
      UiButton,
    },
  })
  export default class UiHeader extends Vue {

    private isMobileNavExpanded: boolean = false;

    @Prop() public items: NavigationItem[];

    private handleToggleMobileNav() {
      this.isMobileNavExpanded = !this.isMobileNavExpanded;
    }

  }
</script>


<style lang="scss" scoped>
  .header {
    height: $grid-step * 20; // 80px
    flex-shrink: 0;

    @include UiMediaMobile() {
      height: $grid-step * 15; // 60px
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

    &__container {
      @include UiLayout();

      display: flex;
      align-items: center;
      justify-content: space-between;
      height: $grid-step * 20; // 80px

      @include UiTheme() {
        background-color: UiColor(shade-100);
      }

      @include UiMediaMobile() {
        height: $grid-step * 15; // 60px
      }
    }

    &__logo {
      margin-right: map_get($grid-spacing, xl);

      @include UiMediaMobileAndTablet() {
        margin-right: 0;
      }
    }

    &__nav-items {
      flex-grow: 1;
      display: flex;
      height: 100%;
      justify-content: flex-end;

      @include UiMediaMobileAndTablet() {
        display: none;
      }
    }

    &__link {
      @include UiTypographyBody1();
      display: flex;
      height: 100%;
      align-items: center;

      padding: 0 map_get($grid-spacing, md);

      text-decoration: none;
      @include UiTheme() {
        color: UiColor(shade-700);
      }

      @include UiMediaMobileAndTablet() {
        height: $grid-step * 15;
      }

      &:hover {
        @include UiTheme() {
          background-color: rgba(UiColor(shade-900), 0.05);
        }
      }

      &:active {
        background-color: rgba(0, 0, 0, 0.1);
      }

      &_is-active {
        @include UiTheme() {
          color: UiColor(main);
        }
      }

    }

    // MOBILE NAVIGATION

    &__mobile-nav {

      display: block;
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10000;

      opacity: 0;
      visibility: hidden;

      background-color: rgba(0, 0, 0, 0.3);

      transition: opacity linear 100ms, visibility linear 100ms;

      &_is-expanded {
        opacity: 1;
        visibility: visible;

        .header__mobile-nav-block {
          transform: translateX(0);
        }
      }

      @include UiMediaDesktop() {
        display: none;
      }
    }

    &__mobile-nav-block {
      @include UiPadding(md, top);
      @include UiPadding(md, bottom);
      height: 100vh;
      width: 90%;
      display: flex;
      flex-direction: column;

      transform: translateX(-($grid-step * 30));

      transition: transform ease-out 300ms;

      @include UiTheme() {
        background-color: UiColor(shade-200);
      }
    }

    &__link-icon {
      @include UiMargin(xxs, right);
      margin-bottom: 2px;
    }

    &__mopbile-nav-row {
      @include UiPadding(md, left);
      @include UiPadding(md, right);
      @include UiPadding(md, bottom);
      display: flex;
      justify-content: space-between;
    }
  }
</style>
