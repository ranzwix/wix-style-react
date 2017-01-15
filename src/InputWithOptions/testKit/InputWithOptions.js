import React from 'react';
import InputWithOptions from '../InputWithOptions';
import ReactTestUtils from 'react-addons-test-utils';
import inputDriverFactory from '../../Input/Input.driver';
import {dropdownLayoutDriverFactory} from '../../DropdownLayout/testkit/DropdownLayout';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const inputWithOptionsDriverFactory = ({component}) => {

  const inputDriver = inputDriverFactory({component});
  const dropdownLayoutDriver = dropdownLayoutDriverFactory({component: component.childNodes[1].childNodes[0]});

  const inputWrapper = component.childNodes[0];

  const driver = {
    focus: () => ReactTestUtils.Simulate.focus(inputWrapper),
    blur: () => ReactTestUtils.Simulate.blur(component),
    pressDownKey: () => ReactTestUtils.Simulate.keyDown(inputWrapper, {key: 'ArrowDown'}),
    pressUpKey: () => ReactTestUtils.Simulate.keyDown(inputWrapper, {key: 'ArrowUp'}),
    pressAnyKey: () => ReactTestUtils.Simulate.keyDown(inputWrapper, {key: 'Any'}),
    pressEnterKey: () => ReactTestUtils.Simulate.keyDown(inputWrapper, {key: 'Enter'}),
    pressEscKey: () => ReactTestUtils.Simulate.keyDown(inputWrapper, {key: 'Escape'}),
  };
  return {driver, inputDriver, dropdownLayoutDriver};
};

const componentFactory = (props = {}) => {
  let component;
  const wrapperDiv = document.createElement('div');
  ReactDOM.render(<div ref={r => component = r}><InputWithOptions {...props}/></div>, wrapperDiv);
  return {component: component.childNodes[0], wrapper: wrapperDiv};
};

const inputWithOptionsTestkitFactory = ({wrapper, id}) => {
  const component = $(wrapper).find(`#${id}`)[0];
  return inputWithOptionsDriverFactory({component, wrapper});
};

export {inputWithOptionsTestkitFactory, componentFactory, inputWithOptionsDriverFactory};
