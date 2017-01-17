import _ from 'lodash/fp';
import React from 'react';
import {componentFactory, dropdownDriverFactory} from './testKit/Dropdown';
import {runInputWithOptionsTest} from '../InputWithOptions/inputWithOptions.spec';

runInputWithOptionsTest(dropdownDriverFactory);

describe('Dropdown', () => {

  const createDriver = _.compose(dropdownDriverFactory, componentFactory);

  const options = [
    {id: 0, value: 'Option 1'},
    {id: 1, value: 'Option 2'},
    {id: 2, value: 'Option 3', disabled: true},
    {id: 3, value: 'Option 4'},
    {id: 'divider1', value: '-'},
    {id: 'element1', value: <span style={{color: 'brown'}}>Option 4</span>}
  ];

  it('should select an item when clicked', () => {
    const {driver, dropdownLayoutDriver} = createDriver({options});
    driver.focus();
    dropdownLayoutDriver.clickAtOption(0);
    expect(dropdownLayoutDriver.isOptionSelected(0)).toBeTruthy();
  });

  it('should enter the selected option text when selected', () => {
    const {driver, inputDriver, dropdownLayoutDriver} = createDriver({options});
    driver.focus();
    dropdownLayoutDriver.clickAtOption(0);
    expect(inputDriver.getValue()).toBe('Option 1');
  });

  it('should be read only', () => {
    const {inputDriver} = createDriver({options});
    expect(inputDriver.getReadOnly()).toBeTruthy();
  });
});
