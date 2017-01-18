import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import autoCompleteDriverFactory from './AutoComplete.driver';
import AutoComplete from './AutoComplete';
import {createDriverFactory} from '../test-common';
import {autoCompleteTestkitFactory} from '../../testkit';
import {autoCompleteTestkitFactory as enzymeAutoCompleteTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';
import {runInputWithOptionsTest} from '../InputWithOptions/InputWithOptions.spec';

runInputWithOptionsTest(autoCompleteDriverFactory);

describe('Autocomplete', () => {

  const createDriver = createDriverFactory(autoCompleteDriverFactory);

  const options = [
    {id: 0, value: 'aaa'},
    {id: 1, value: 'abb'},
    {id: 2, value: 'bbb', disabled: true},
    {id: 3, value: 'bcc'},
    {id: 'divider1', value: '-'},
    {id: 'element1', value: <span style={{color: 'brown'}}>ccc</span>}
  ];

  it('should not filter anything without predicate function', () => {
    const {driver, dropdownLayoutDriver} = createDriver(<AutoComplete options={options}/>);
    driver.focus();
    expect(dropdownLayoutDriver.optionsLength()).toBe(6);
  });

  it('should filter items according to predicate function', () => {
    const predicate = option => option.value.toString().toLowerCase().indexOf('a') !== -1;
    const {driver, dropdownLayoutDriver} = createDriver(<AutoComplete options={options} predicate={predicate}/>);
    driver.focus();
    expect(dropdownLayoutDriver.optionsLength()).toBe(2);
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><AutoComplete dataHook={dataHook}/></div>));
      const autoCompleteTestkit = autoCompleteTestkitFactory({wrapper, dataHook});
      expect(autoCompleteTestkit.driver.exists()).toBeTruthy();
      expect(autoCompleteTestkit.inputDriver.exists()).toBeTruthy();
      expect(autoCompleteTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<AutoComplete dataHook={dataHook}/>);
      const autoCompleteTestkit = enzymeAutoCompleteTestkitFactory({wrapper, dataHook});
      expect(autoCompleteTestkit.driver.exists()).toBeTruthy();
      expect(autoCompleteTestkit.inputDriver.exists()).toBeTruthy();
      expect(autoCompleteTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
    });
  });
});
