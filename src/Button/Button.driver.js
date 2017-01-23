import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import Button from '../Button';

const buttonDriverFactory = ({component, wrapper}) => {
  const isClassExists = (component, className) => (component.className.indexOf(className) !== -1);

  return {
    exists: () => !!component,
    click: () => ReactTestUtils.Simulate.click(component),
    getButtonTextContent: () => component.textContent,
    isButtonDisabled: () => isClassExists(component, 'disabled'),
    doesComponentHasClass: className => component.className.indexOf(className) > 0,
    isComponentHovered: () => isClassExists(component, 'hover'),
    setProps: props => {
      ReactDOM.render(<div ref={r => component = r}><Button {...props}/></div>, wrapper);
    }
  };
};

export default buttonDriverFactory;
