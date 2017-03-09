import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import GoogleAddressInputWithLabel from './GoogleAddressInputWithLabel';
import GoogleAddressInput from '../GoogleAddressInput';
import {textFieldTestkitFactory} from '../../testkit';
import {textFieldTestkitFactory as enzymeTextFieldTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('GoogleAddressInputWithLabel', () => {
  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'compHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><GoogleAddressInputWithLabel dataHook={dataHook}><GoogleAddressInput/></GoogleAddressInputWithLabel></div>));
      const textFieldTestkit = textFieldTestkitFactory({wrapper, dataHook});
      expect(textFieldTestkit.exists()).toBeTruthy();
    });

    describe('enzyme testkit', () => {
      it('should exist', () => {
        const dataHook = 'myDataHook';
        const wrapper = mount(<GoogleAddressInputWithLabel dataHook={dataHook}><GoogleAddressInput/></GoogleAddressInputWithLabel>);
        const textFieldTestkit = enzymeTextFieldTestkitFactory({wrapper, dataHook});
        expect(textFieldTestkit.exists()).toBeTruthy();
      });
    });
  });
});
