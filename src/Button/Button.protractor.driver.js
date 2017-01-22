import _ from 'lodash/fp';

const buttonDriverFactory = component => ({
  click: () => component.click(),
  getButtonText: () => component.getText(),
  element: () => component
});

export default buttonDriverFactory;
