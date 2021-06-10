<template>
  <div class="password-field">
    <UiInput
      :value="password"
      @input="$emit('input', $event)"
      class="password-field__input"
      :isBlock="true"
      :readonly="readonly"
      :size="size"
      :type="isPasswordShown ? 'text' : 'password'"
      :disabled="isDisabled"
    />

    <UiButton
      class="password-field__button"
      :size="smallerSize"
      shape="circled"
      type="subdued"
      width="shrink"
      :disabled="isShowDisabled"
      @click="isPasswordShown = !isPasswordShown"
    >
      <UiIcon v-if="!isPasswordShown" name="visibility" :size="size"/>
      <UiIcon v-if="isPasswordShown" name="visibility-off" :size="size"/>
    </UiButton>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop, PropSync } from 'vue-property-decorator';

  import UiInput from '@/app/ui-kit/UiInput.vue';
  import UiButton from '@/app/ui-kit/UiButton.vue';
  import UiIcon from '@/app/ui-kit/UiIcon.vue';


  @Component({
    components: {
      UiButton,
      UiInput,
      UiIcon,
    },
  })
  export default class PasswordField extends Vue {

    @Prop({ default: false }) public readonly?: boolean;

    @Prop({ default: false }) public isShowDisabled?: boolean;

    @Prop({ default: false }) public isDisabled?: boolean;

    @Prop({ default: 'md' }) public size?: string;

    @PropSync('value') public password!: string;

    public isPasswordShown: boolean = false;

    public get smallerSize(): string {
      const sizeMap = {
        lg: 'md',
        md: 'sm',
        sm: 'xs',
      };
      return sizeMap[this.size] || 'sm';
    }

  }
</script>

<style scoped lang="scss">
  .password-field {

    @include UiMargin(xxs, right);
    position: relative;
    display: flex;
    align-items: center;
    width: fit-content;

    &__input {
      @include UiPadding(xl, right);
    }

    &__button {
      @include UiMargin(xxxs, right);
      position: absolute;
      right: 0;
    }

  }
</style>
