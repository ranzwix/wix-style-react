import _ from 'lodash/fp';

const labelDriverFactory = component => ({
  click: () => component.click(),
  getLabelText: () => component.getText(),
  getAssociatedInput: () => component.getAttribute('for').then(id => $(`#${id}`)),
  element: () => component
});

export default labelDriverFactory;
