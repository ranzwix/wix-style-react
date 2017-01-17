import React from 'react';
import AutoComplete from '../AutoComplete';
import {inputWithOptionsDriverFactory} from '../../InputWithOptions/testKit/InputWithOptions';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const autocompleteDriverFactory = inputWithOptionsDriverFactory;

const componentFactory = (props = {}) => {
  let component;
  const wrapperDiv = document.createElement('div');
  ReactDOM.render(<div ref={r => component = r}><AutoComplete {...props}/></div>, wrapperDiv);
  return {component: component.childNodes[0], wrapper: wrapperDiv};
};

const autocompleteTestkitFactory = ({wrapper, id}) => {
  const component = $(wrapper).find(`#${id}`)[0];
  return autocompleteDriverFactory({component, wrapper});
};

export {autocompleteTestkitFactory, componentFactory, autocompleteDriverFactory};
