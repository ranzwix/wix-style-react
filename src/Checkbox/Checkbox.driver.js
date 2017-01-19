import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from './Checkbox';
import ReactTestUtils from 'react-addons-test-utils';
import $ from 'jquery';

const checkboxDriverFactory = ({component, wrapper}) => {

  const checkbox = $(component).find('input')[0];
  const isClassExists = (component, className) => !!(component.className.match(new RegExp('\\b' + className + '\\b')));

  return {
    exists: () => !!component,
    click: () => ReactTestUtils.Simulate.change(checkbox),
    isChecked: () => isClassExists(component, 'checked'),
    isDisabled: () => isClassExists(component, 'disabled'),
    isIndeterminate: () => $(component).find('.indeterminate').length === 1,
    getLabel: () => component.textContent,
    setProps: props => {
      ReactDOM.render(<div ref={r => component = r}><Checkbox {...props}/></div>, wrapper);
    }
  };
};

export default checkboxDriverFactory;
