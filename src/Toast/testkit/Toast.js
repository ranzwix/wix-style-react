import React from 'react';
import ReactDOM from 'react-dom';
import Toast from '../Toast';
import ReactTestUtils from 'react-addons-test-utils';
import $ from 'jquery';

const byDataHook = hook => `[data-hook|="${hook}"]`;

const toastDriverFactory = ({component}) => {
  const $component = $(component);

  const styleStringToObj = input =>
    input //"key1: value1;key2: value2;"
      .replace(' ', '')
      .split(';')
      .filter(val => val !== '')
      .reduce((result, next) => {
        const [k, v] = next.split(':');
        result[k] = v;
        return result;
      }, {});

  return {
    hasId: id => $component.attr('id') === id,
    getToastText: () => $component.find(byDataHook('toast-text')).text(),
    clickOnClose: () => ReactTestUtils.Simulate.click($component.find(byDataHook('toast-close'))[0]),
    hasTheme: theme => $component.hasClass(theme),
    toastExists: () => $component.parent().find(byDataHook('toast')).length > 0,
    getTopProperty: () => styleStringToObj($component.attr('style')).top
  };
};

const componentFactory = (props = {}) => {
  let component;
  const {children, ...otherProps} = props;
  const wrapperDiv = document.createElement('div');

  ReactDOM.render(<div ref={r => component = r}><Toast {...otherProps}>{children}</Toast></div>, wrapperDiv);

  return {component: component.childNodes[0], wrapper: wrapperDiv};
};

const toastTestkitFactory = ({wrapper, id}) => {
  const component = $(wrapper).find(`#${id}`)[0];
  return toastDriverFactory({component, wrapper});
};

export {toastTestkitFactory, componentFactory, toastDriverFactory};
