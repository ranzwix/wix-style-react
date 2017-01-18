import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import multiSelectDriverFactory from './MultiSelect.driver';
import MultiSelect from './MultiSelect';
import {createDriverFactory} from '../test-common';
import {multiSelectTestkitFactory} from '../../testkit';
import {multiSelectTestkitFactory as enzymeMultiSelectTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import {runInputWithOptionsTest} from '../InputWithOptions/InputWithOptions.spec';

runInputWithOptionsTest(multiSelectDriverFactory);

describe('multiSelect', () => {

  const createDriver = createDriverFactory(multiSelectDriverFactory);
  const options = [
    {value: 'Alabama', id: 'Alabama', tag: {label: 'Alabama'}},
    {value: 'Alaska', id: 'Alaska'},
    {value: 'Arkansas', id: 'Arkansas', tag: {label: 'Arkansas'}},
    {value: 'Arkansas', id: 'Arkansas'},
    {value: 'California', id: 'California'},
    {value: 'California2', id: 'California2'},
    {value: 'California3', id: 'California3'},
    {value: 'California4', id: 'California4'},
    {value: 'California5', id: 'California5'},
    {value: 'California6', id: 'California6'},
    {value: 'California7', id: 'California7'},
    {value: 'Two words', id: 'Two words'}
  ];

  it('should show dropdown when autofocus is on', () => {
    const {inputDriver, dropdownLayoutDriver} = createDriver(<MultiSelect options={options} autoFocus={true}/>);
    expect(inputDriver.isFocus()).toBeTruthy();
    expect(dropdownLayoutDriver.isShown()).toBeTruthy();
  });

  it('should remove options that were selected and became tags', () => {
    const tags = [{id: 'Alabama', label: 'Alabama'}];

    const {driver, dropdownLayoutDriver} = createDriver(<MultiSelect options={options} autoFocus={true}/>);
    expect(dropdownLayoutDriver.optionsLength()).toBe(options.length);

    driver.setProps({options, tags});
    expect(dropdownLayoutDriver.optionsLength()).toBe(options.length - tags.length);
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><MultiSelect dataHook={dataHook}/></div>));
      const multiSelectTestkit = multiSelectTestkitFactory({wrapper, dataHook});
      expect(multiSelectTestkit.driver.exists()).toBeTruthy();
      expect(multiSelectTestkit.inputDriver.exists()).toBeTruthy();
      expect(multiSelectTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<MultiSelect dataHook={dataHook}/>);
      const multiSelectTestkit = enzymeMultiSelectTestkitFactory({wrapper, dataHook});
      expect(multiSelectTestkit.driver.exists()).toBeTruthy();
      expect(multiSelectTestkit.inputDriver.exists()).toBeTruthy();
      expect(multiSelectTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
    });
  });
});
