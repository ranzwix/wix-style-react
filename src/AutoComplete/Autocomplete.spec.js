import _ from 'lodash/fp';
import React from 'react';
import {componentFactory, autocompleteDriverFactory} from './testKit/Autocomplete';
import {runInputWithOptionsTest} from '../InputWithOptions/inputWithOptions.spec';

runInputWithOptionsTest(autocompleteDriverFactory);

describe('Autocomplete', () => {

  const createDriver = _.compose(autocompleteDriverFactory, componentFactory);

  const options = [
    {id: 0, value: 'aaa'},
    {id: 1, value: 'abb'},
    {id: 2, value: 'bbb', disabled: true},
    {id: 3, value: 'bcc'},
    {id: 'divider1', value: '-'},
    {id: 'element1', value: <span style={{color: 'brown'}}>ccc</span>}
  ];

  it('should not filter anything without predicate function', () => {
    const {driver, dropdownLayoutDriver} = createDriver({options});
    driver.focus();
    expect(dropdownLayoutDriver.optionsLength()).toBe(6);
  });

  it('should filter items according to predicate function', () => {
    const predicate = option => option.value.toString().toLowerCase().indexOf('a') !== -1;
    const {driver, dropdownLayoutDriver} = createDriver({options, predicate});
    driver.focus();
    expect(dropdownLayoutDriver.optionsLength()).toBe(2);
  });
});
