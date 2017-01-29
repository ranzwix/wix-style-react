import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import Toast from './Toast';
import $ from 'jquery';

const byDataHook = hook => `[data-hook|="${hook}"]`;

const toastDriverFactory = ({component, wrapper}) => {
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
    exists: () => !!component,
    hasId: id => $component.attr('id') === id,
    getToastText: () => $component.find(byDataHook('toast-text')).text(),
    clickOnClose: () => ReactTestUtils.Simulate.click($component.find(byDataHook('toast-close'))[0]),
    hasTheme: theme => $component.hasClass(theme),
    isVisible: () => component.childNodes.length > 0,
    getTopProperty: () => styleStringToObj($component.attr('style')).top,
    setProps: props => {
      ReactDOM.render(<div ref={r => component = r}><Toast {...props}/></div>, wrapper);
    }
  };
};

export default toastDriverFactory;
