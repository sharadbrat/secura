<template>
  <div class="password-field">
    <UiInput
      ref="input"
      :value="password"
      @input="$emit('input', $event)"
      class="password-field__input"
      placeholder="Something really secret"
      :isBlock="true"
      :readonly="readonly"
      :size="size"
      :type="isPasswordShown ? 'text' : 'password'"
      autocomplete="off"
      :disabled="isDisabled"
      @keydown="onKeyDown"
    />

    <UiButton
      class="password-field__button"
      shape="circled"
      type="subdued"
      width="shrink"
      :aria-label="isPasswordShown ? 'Hide' : 'Show'"
      :size="smallerSize"
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
  import {
    Component,
    Emit,
    Prop,
    PropSync,
    Ref,
  } from 'vue-property-decorator';

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

    @Ref()
    public input: UiInput;

    public isPasswordShown: boolean = false;

    public get smallerSize(): string {
      const sizeMap = {
        lg: 'md',
        md: 'sm',
        sm: 'xs',
      };
      return sizeMap[this.size] || 'sm';
    }

    public focus() {
      (this.input.$el as HTMLInputElement).focus();
    }

    public onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        this.confirm();
      }
    }

    @Emit()
    public confirm() {
      return null;
    }

  }
</script>

<style scoped lang="scss">
  .password-field {

    position: relative;
    display: flex;
    align-items: center;

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
