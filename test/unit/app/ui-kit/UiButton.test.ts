import { assert } from 'chai';
import { shallowMount } from '@vue/test-utils';

import UiButton from '@/app/ui-kit/UiButton.vue';


const SELECTORS = {
  button: '.ui-button',
};


describe('App | ui-kit | UiButton.vue', () => {

  it('Works', () => {
    assert.isOk(shallowMount(UiButton));
  });


  it('Has several types', () => {
    ['primary', 'secondary', 'link', 'subdued'].forEach(type => {
      const wrapper = shallowMount(UiButton, {
        propsData: { type },
      });

      const button = wrapper.find(SELECTORS.button);
      assert.isTrue(button.classes().includes(`ui-button_type-${type}`));
    });
  });


  it('Has several sizes', () => {
    ['md', 'sm', 'xs'].forEach(size => {
      const wrapper = shallowMount(UiButton, {
        propsData: { size },
      });

      const button = wrapper.find(SELECTORS.button);
      assert.isTrue(button.classes().includes(`ui-button_size-${size}`));
    });
  });


  it('Has several shapes', () => {
    ['circled', 'rounded'].forEach(shape => {
      const wrapper = shallowMount(UiButton, {
        propsData: { shape },
      });

      const button = wrapper.find(SELECTORS.button);
      assert.isTrue(button.classes().includes(`ui-button_shape-${shape}`));
    });
  });


  it('Has several widths', () => {
    ['block', 'fit', 'shrink'].forEach(width => {
      const wrapper = shallowMount(UiButton, {
        propsData: { width },
      });

      const button = wrapper.find(SELECTORS.button);
      assert.isTrue(button.classes().includes(`ui-button_width-${width}`));
    });
  });


  it('Emits "click" event when clicked', () => {
    const wrapper = shallowMount(UiButton);
    wrapper.find('button').trigger('click');
    assert.isOk(wrapper.emitted().click);
  });

});
