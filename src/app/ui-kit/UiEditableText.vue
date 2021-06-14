<template>
  <span
    contenteditable
    class="ui-editable-text"
    ref="editable"
    :data-placeholder="placeholder"
    :data-label="label"
    :innerText="value"
    @input="onInput($event)"
    @keypress="onKeypress($event)"
  />
</template>

<script lang="ts">
  import Vue from 'vue';
  import {
    Component, Emit, Prop, Ref,
  } from 'vue-property-decorator';


  /**
   * @class UiEditableText
   * @extends Vue
   * @public
   */
  @Component
  export default class UiEditableText extends Vue {

    @Prop()
    public value: string;


    @Prop()
    public placeholder: string;


    @Prop()
    public label: string;


    @Prop()
    public isNumber: boolean;


    @Ref('editable')
    public editableElement: HTMLSpanElement;


    protected mounted() {
      this.editableElement.innerText = this.value;
    }


    @Emit('input')
    public onInput(event: Event) {
      const el = event.target as HTMLSpanElement;
      return el.innerText;
    }


    public onKeypress(event: KeyboardEvent) {
      if (this.isNumber) {
        if (Number.isNaN(+String.fromCharCode(event.which))) {
          event.preventDefault();
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  .ui-editable-text {
    @include UiPadding(xs);
    @include UiBorderRadius(sm);

    display: inline-block;
    cursor: default;

    @include UiTheme() {
      border: 1px solid UiColor(shade-400);
    }


    &:not(:empty)::before {
      display: none;
    }


    &::before {
      content: attr(data-placeholder);
      @include UiTheme() {
        color: UiColor(shade-600);
      }
    }


    &[data-label]::after {
      content: attr(data-label);
      @include UiMargin(xs, left);
    }

  }
</style>
