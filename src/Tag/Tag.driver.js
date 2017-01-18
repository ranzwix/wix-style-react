import React from 'react';
import Tag from '../Tag';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const tagDriverFactory = ({component, wrapper}) => {

  const isClassExists = (component, className) => (component && component.className.indexOf(className) !== -1);
  const removeButton = $(component).find('a')[0];
  const thumb = $(component).find('span')[0];

  return {
    exists: () => !!component,
    isLarge: () => isClassExists(component, 'large'),
    isRemovable: () => isClassExists(removeButton, 'tagRemoveButton'),
    removeTag: () => ReactTestUtils.Simulate.click(removeButton),
    isThumbExists: () => isClassExists(thumb, 'thumb'),
    getLabel: () => component.textContent,
    setProps: props => {
      ReactDOM.render(<div ref={r => component = r}><Tag {...props}/></div>, wrapper);
    }
  };
};

export default tagDriverFactory;
