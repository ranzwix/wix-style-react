import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash/fp';

const componentFactory = Element => {
  let component;
  const wrapperDiv = document.createElement('div');
  ReactDOM.render(<div ref={r => component = r}>{Element}</div>, wrapperDiv);
  return {component: component.childNodes[0], wrapper: wrapperDiv};
};

export const createDriverFactory = driverFactory => _.compose(driverFactory, componentFactory);

export const testkitFactoryCreator = driverFactory => ({wrapper, dataHook}) => {
  const component = $(wrapper).find(`[data-hook='${dataHook}']`)[0];
  return driverFactory({component, wrapper});
};

// enzyme
export const enzymeTestkitFactoryCreator = driverFactory => ({wrapper, dataHook}) => {
  const component = wrapper.findWhere(n => !n.props().dataHook && n.html() && $(n.html()).attr('data-hook') === dataHook);
  return driverFactory({component: component.node, wrapper});
};

// protractor
export const protractorTestkitFactoryCreator = driver => dataHook => {
  const component = $(`[data-hook='${dataHook}']`);
  return driver(component);
};
