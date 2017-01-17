import React from 'react';
import MultiSelect from './MultiSelect';
import {inputWithOptionsDriverFactory} from '../InputWithOptions/testKit/InputWithOptions';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const multiSelectDriverFactory = ({component, wrapper}) => {

  const {driver, inputDriver, dropdownLayoutDriver} = inputWithOptionsDriverFactory({component, wrapper});

  const multiSelectDriver = Object.assign(driver, {
    exists: () => !!component
  });

  return {driver: multiSelectDriver, inputDriver, dropdownLayoutDriver};
};

const componentFactory = (props = {}) => {
  let component;
  const wrapperDiv = document.createElement('div');
  ReactDOM.render(<div ref={r => component = r}><MultiSelect {...props}/></div>, wrapperDiv);
  return {component: component.childNodes[0], wrapper: wrapperDiv};
};

const multiSelectTestkitFactory = ({wrapper, id}) => {
  const component = $(wrapper).find(`#${id}`)[0];
  return multiSelectDriverFactory({component, wrapper});
};

export {multiSelectTestkitFactory, componentFactory, multiSelectDriverFactory};
