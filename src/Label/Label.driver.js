import React from 'react';
import ReactDOM from 'react-dom';
import Label from './Label';

const labelDriverFactory = ({component, wrapper}) => {
  return {
    exists: () => !!component,
    getTagName: () => component.tagName.toLowerCase(),
    getLabelTextContent: () => component.textContent,
    getClassList: () => component.className,
    getAttr: attrName => component.getAttribute(attrName),
    setProps: props => {
      ReactDOM.render(<div ref={r => component = r}><Label {...props}/></div>, wrapper);
    }
  };
};

export default labelDriverFactory;
