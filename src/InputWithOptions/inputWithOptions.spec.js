import _ from 'lodash/fp';
import React from 'react';
import {componentFactory, inputWithOptionsDriverFactory} from './testKit/InputWithOptions';

const runInputWithOptionsTest = driverFactory => {
  describe('InputWithOptions', () => {

    const createDriver = _.compose(driverFactory, componentFactory);
    const options = [
      {id: 0, value: 'Option 1'},
      {id: 1, value: 'Option 2'},
      {id: 2, value: 'Option 3', disabled: true},
      {id: 3, value: 'Option 4'},
      {id: 'divider1', value: '-'},
      {id: 'element1', value: <span style={{color: 'brown'}}>Option 4</span>}
    ];

    it('should show dropdown when autofocus is on', () => {
      const {inputDriver, dropdownLayoutDriver} = createDriver({options, autoFocus: true});
      expect(inputDriver.isFocus()).toBeTruthy();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should have an Input and an hidden DropdownLayout', () => {
      const {inputDriver, dropdownLayoutDriver} = createDriver({options});
      expect(inputDriver.exists()).toBeTruthy();
      expect(dropdownLayoutDriver.exists()).toBeTruthy();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });

    it('should show DropdownLayout when input get focused', () => {
      const {driver, dropdownLayoutDriver} = createDriver({options});
      driver.focus();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should show DropdownLayout on any key press', () => {
      const {driver, dropdownLayoutDriver} = createDriver({options});
      driver.pressAnyKey();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should show DropdownLayout on down key', () => {
      const {driver, dropdownLayoutDriver} = createDriver({options});
      driver.pressUpKey();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should show DropdownLayout on up key', () => {
      const {driver, dropdownLayoutDriver} = createDriver({options});
      driver.pressDownKey();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should hide DropdownLayout on enter and esc key press', () => {
      const {driver, dropdownLayoutDriver} = createDriver({options});
      driver.focus();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
      driver.pressEnterKey();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
      driver.pressUpKey();
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
      driver.pressEscKey();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });

    it('should call onManuallyInput on enter key press', () => {
      const onManuallyInput = jest.fn();
      const {driver, inputDriver} = createDriver({options, onManuallyInput});
      driver.setProps({options, onManuallyInput});
      inputDriver.enterText('my text');
      driver.pressEnterKey();
      expect(onManuallyInput).toBeCalledWith('my text');
    });

    it('should hide options on selection by default', () => {
      const {driver, dropdownLayoutDriver} = createDriver({options});
      driver.focus();
      dropdownLayoutDriver.clickAtOption(0);
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });

    it('should not hide options on selection', () => {
      const {driver, dropdownLayoutDriver} = createDriver({options, closeOnSelect: false});
      driver.focus();
      dropdownLayoutDriver.clickAtOption(0);
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    });

    it('should call onSelect when an option is pressed', () => {
      const onSelect = jest.fn();
      const {driver, dropdownLayoutDriver} = createDriver({options, onSelect});
      driver.focus();
      dropdownLayoutDriver.clickAtOption(0);
      expect(onSelect).toBeCalledWith({id: 0, value: 'Option 1'});
    });

    it('should call onFocus', () => {
      const onFocus = jest.fn();
      const {driver} = createDriver({options, onFocus});
      driver.focus();
      expect(onFocus).toBeCalled();
    });
  });
};

runInputWithOptionsTest(inputWithOptionsDriverFactory);

export {runInputWithOptionsTest};
