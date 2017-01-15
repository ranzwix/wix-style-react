import React from 'react';
import DropdownLayout from '../DropdownLayout';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const dropdownLayoutDriverFactory = ({component, wrapper}) => {

  const isClassExists = (component, className) => !!(component.className.match(new RegExp('\\b' + className + '\\b')));
  const options = component.childNodes[0];
  const optionAt = position => (options.childNodes[position]);

  return {
    exists: () => !!component,
    isShown: () => isClassExists(options, 'shown'),
    isDown: () => isClassExists(options, 'down'),
    isUp: () => isClassExists(options, 'up'),
    tabIndex: () => component.tabIndex,
    optionsLength: () => options.childNodes.length,
    mouseEnterAtOption: position => ReactTestUtils.Simulate.mouseEnter(optionAt(position)),
    mouseLeaveAtOption: position => ReactTestUtils.Simulate.mouseLeave(optionAt(position)),
    mouseClickOutside: () => ReactTestUtils.Simulate.blur(options),
    isOptionHovered: position => isClassExists(optionAt(position), 'hovered'),
    isOptionSelected: position => isClassExists(optionAt(position), 'selected'),
    isOptionHoveredWithGlobalClassName: position => isClassExists(optionAt(position), 'wixstylereactHovered'),
    isOptionSelectedWithGlobalClassName: position => isClassExists(optionAt(position), 'wixstylereactSelected'),
    classes: () => options.className,
    pressDownKey: () => ReactTestUtils.Simulate.keyDown(component, {key: 'ArrowDown'}),
    pressUpKey: () => ReactTestUtils.Simulate.keyDown(component, {key: 'ArrowUp'}),
    pressEnterKey: () => ReactTestUtils.Simulate.keyDown(component, {key: 'Enter'}),
    pressTabKey: () => ReactTestUtils.Simulate.keyDown(component, {key: 'Tab'}),
    pressEscKey: () => ReactTestUtils.Simulate.keyDown(component, {key: 'Escape'}),
    optionContentAt: position => optionAt(position).textContent,
    clickAtOption: position => ReactTestUtils.Simulate.mouseDown(optionAt(position)),
    isOptionADivider: position => isClassExists(optionAt(position), 'divider'),
    setProps: props => {
      ReactDOM.render(<div ref={r => component = r}><DropdownLayout {...props}/></div>, wrapper);
    }
  };
};

const componentFactory = (props = {}) => {
  let component;
  const wrapperDiv = document.createElement('div');
  ReactDOM.render(<div ref={r => component = r}><DropdownLayout visible {...props}/></div>, wrapperDiv);
  return {component: component.childNodes[0], wrapper: wrapperDiv};
};

const dropdownLayoutTestkitFactory = ({wrapper, id}) => {
  const component = $(wrapper).find(`#${id}`)[0];
  return dropdownLayoutDriverFactory({component, wrapper});
};

export {dropdownLayoutTestkitFactory, componentFactory, dropdownLayoutDriverFactory};
