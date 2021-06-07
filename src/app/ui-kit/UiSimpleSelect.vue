<template>
  <select
    class="ui-simple-select"
    :value="index"
    @input="onInput($event.target.value)"
    :placeholder="placeholder"
  >
    <option disabled value="-1">{{placeholder}}</option>
    <option
      v-for="(option, index) in options"
      :value="index"
      :key="option[label]"
    >
      {{option[label]}}
    </option>
  </select>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop, Emit } from 'vue-property-decorator';

  import UiInput from '@/app/ui-kit/UiInput.vue';


  /**
   * @class UiSimpleSelect
   * @extends Vue
   * @public
   */
  @Component({
    components: {
      UiInput,
    },
  })
  export default class UiSimpleSelect<T> extends Vue {

    /**
     * @property {T[]} options
     * @public
     */
    @Prop()
    public options: T[];


    @Prop()
    public value: T;


    private index: number = -1;


    /**
     * @property {string} placeholder
     * @optional
     * @public
     */
    @Prop({ default: 'Выберите один из вариантов' })
    public placeholder?: string;


    /**
     * @property {string} label
     * @optional
     * @public
     */
    @Prop({ default: 'label' })
    public label?: string;


    @Emit('input')
    public onInput(i: number): T {
      this.index = i;
      return this.options[i];
    }

  }
</script>

<style lang="scss" scoped>
  .ui-simple-select {
    @include UiInputAppearance();
  }
</style>
