import _ from 'lodash/fp';
import React from 'react';
import {componentFactory, multiSelectDriverFactory} from './testKit/MultiSelect';
// import {runInputWithOptionsTest} from '../InputWithOptions/inputWithOptions.spec';

// runInputWithOptionsTest(multiSelectDriverFactory);

describe('multiSelect', () => {

  const createDriver = _.compose(multiSelectDriverFactory, componentFactory);
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
    const {inputDriver, dropdownLayoutDriver} = createDriver({options, autoFocus: true});
    expect(inputDriver.isFocus()).toBeTruthy();
    expect(dropdownLayoutDriver.isShown()).toBeTruthy();
  });
});
