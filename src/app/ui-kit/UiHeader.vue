<template>
  <header class="header">
    <div class="header__fixed-header">
      <div class="header__container">

        <UiLogo class="header__logo"/>

        <button
          v-if="items && items.length > 0"
          aria-label="Menu"
          class="header__mobile-nav-toggler"
          @click="handleToggleMobileNav"
        />

        <nav class="header__nav-items">

          <router-link
            v-for="item in items"
            class="header__link"
            active-class="header__link_is-active"
            :to="item.url"
            :key="item.url"
          >
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
        <button
          class="header__mobile-nav-toggler header__mobile-nav-toggler_close"
          aria-label="Close menu"
          @click="handleToggleMobileNav"
        />

        <router-link
          v-for="item in items"
          class="header__link"
          active-class="header__link_is-active"
          :to="item.url"
          :key="item.url"
          @click.native="handleToggleMobileNav"
        >
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


  export interface NavigationItem {
    url: string;
    title: string;
    icon: string;
  }


  @Component({
    components: {
      UiLogo,
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
      border-bottom: 1px solid UiColor(shade-400);
    }

    &__container {
      @include UiLayout();

      display: flex;
      align-items: center;
      justify-content: space-between;
      height: $grid-step * 20; // 80px

      background-color: UiColor(shade-100);

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
      color: UiColor(shade-700);

      @include UiMediaMobileAndTablet() {
        height: $grid-step * 15;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      &:active {
        background-color: rgba(0, 0, 0, 0.1);
      }

      &_is-active {
        color: UiColor(main);
      }

    }

    // MOBILE NAVIGATION

    &__mobile-nav-toggler {
      $image-data: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='7' y='10' width='18' height='2' rx='1' fill='%23585858'/%3E%3Crect x='7' y='20' width='18' height='2' rx='1' fill='%23585858'/%3E%3Crect x='7' y='15' width='18' height='2' rx='1' fill='%23585858'/%3E%3C/svg%3E%0A");
      $size: $grid-step * 8;
      width: $size;
      height: $size;

      background-image: $image-data;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: transparent;
      border-radius: 50%;

      border: none;
      box-shadow: none;
      appearance: none;

      cursor: pointer;

      &:active {
        background-color: rgba(0, 0, 0, 0.05);
      }

      &_close {
        $image-data: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.3002 5.70997C17.9102 5.31997 17.2802 5.31997 16.8902 5.70997L12.0002 10.59L7.11022 5.69997C6.72022 5.30997 6.09021 5.30997 5.70021 5.69997C5.31021 6.08997 5.31021 6.71997 5.70021 7.10997L10.5902 12L5.70021 16.89C5.31021 17.28 5.31021 17.91 5.70021 18.3C6.09021 18.69 6.72022 18.69 7.11022 18.3L12.0002 13.41L16.8902 18.3C17.2802 18.69 17.9102 18.69 18.3002 18.3C18.6902 17.91 18.6902 17.28 18.3002 16.89L13.4102 12L18.3002 7.10997C18.6802 6.72997 18.6802 6.08997 18.3002 5.70997V5.70997Z' fill='%23585858'/%3E%3C/svg%3E%0A");
        background-image: $image-data;
        margin-left: auto;
        margin-bottom: map_get($grid-spacing, md);
        margin-right: map_get($grid-spacing, md);
      }

      @include UiMediaDesktop() {
        display: none;
      }
    }

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
      height: 100vh;
      width: 90%;
      display: flex;
      flex-direction: column;
      padding: map_get($grid-spacing, md) 0;
      background-color: UiColor(shade-100);

      transform: translateX(-($grid-step * 30));

      transition: transform ease-out 300ms;
    }
  }
</style>
