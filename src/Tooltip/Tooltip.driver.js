import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import Tooltip from './Tooltip';

const tooltipDriverFactory = ({component, wrapper}) => {
  return {
    isShown: () => !!document.body.querySelector('.tooltip'),
    focus: () => ReactTestUtils.Simulate.focus(component),
    blur: () => ReactTestUtils.Simulate.blur(component),
    click: () => ReactTestUtils.Simulate.click(component),
    mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(component),
    mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(component),
    hasErrorTheme: () => !!document.body.querySelector('.error'),
    hasDarkTheme: () => !!document.body.querySelector('.dark'),
    hasLightTheme: () => !!document.body.querySelector('.light'),
    getChildren: () => component.innerHTML,
    getContent: () => {
      let content = document.body.querySelector('.tooltip');
      while (content.children.length > 0) {
        content = content.children[0];
      }
      return content.innerHTML;
    },
    setProps: props => {
      ReactDOM.render(<div ref={r => component = r}><Tooltip {...props}/></div>, wrapper);
    }
  };
};

export default tooltipDriverFactory;
