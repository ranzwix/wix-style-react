import React, {Children} from 'react';
import TextArea from '../TextArea';
import ReactTestUtils from 'react-addons-test-utils';
import $ from 'jquery';

const textAreaDriverFactory = component => ({
  getLabel: () => $('label', component).get(0),
  getInputArea: () => $('textarea', component).get(0),
  getAttr: attrName => component.getAttribute(attrName),
  getNumberOfChildren: () => component.childElementCount
});


const componentFactory = (props = {}) => {
  let {children, ...otherProps} = props;
  children = Children.toArray(children.props.children);

  const component = ReactTestUtils.renderIntoDocument(<div><TextArea {...otherProps}>{children}</TextArea></div>);
  return component.childNodes[0];
};

const textAreaTestkitFactory = ({wrapper, dataHook}) => {
  const textArea = $(wrapper).find(`[data-hook="${dataHook}"]`)[0];
  return textAreaDriverFactory(textArea);
};

export {textAreaTestkitFactory, componentFactory, textAreaDriverFactory};
