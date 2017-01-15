import _ from 'lodash/fp';

const labelDriverFactory = component => ({
  click: () => component.click(),
  getLabelText: () => component.getText(),
  getAssociatedInput: () => component.getAttribute('for').then(id => $(`#${id}`)),
  element: () => component
});

const componentFactory = ({id}) => $(`#${id}`);

const protractorLabelTestkitFactory = _.compose(labelDriverFactory, componentFactory);

export {protractorLabelTestkitFactory};
