import React from 'react';
import ReactDOM from 'react-dom';

const componentFactory = Element => {
  let component;
  const wrapperDiv = document.createElement('div');
  ReactDOM.render(<div ref={r => component = r}>{Element}</div>, wrapperDiv);
  return {component: component.childNodes[0], wrapper: wrapperDiv};
};

export const createDriverFactory = driverFactory => driver => driverFactory(componentFactory(driver));

export const testkitFactoryCreator = driverFactory => ({wrapper, dataHook}) => {
  const component = wrapper.querySelector(`[data-hook='${dataHook}']`);
  return driverFactory({component, wrapper});
};

// enzyme
export const enzymeTestkitFactoryCreator = driverFactory => ({wrapper, dataHook}) => {
  const component = wrapper.findWhere(n => {
    if (n.props().dataHook) {
      return false;
    } else {
      const tmp = document.implementation.createHTMLDocument();
      tmp.body.innerHTML = n.html();
      return tmp.body.children && tmp.body.children[0] && tmp.body.children[0].getAttribute('data-hook') === dataHook;
    }
  });
  return driverFactory({component: component.node, wrapper});
};

// protractor
export const protractorTestkitFactoryCreator = driverFactory => ({dataHook}) => driverFactory($(`[data-hook='${dataHook}']`));
