import _ from 'lodash/fp';

const textFieldDriverFactory = component => ({
  getLabel: () => component.find('label'),
  getInput: () => component.find('input'),
  element: () => component
});

const componentFactory = ({hook}) => $(`[data-hook="${hook}"]`);

const protractorTextFieldTestkitFactory = _.compose(textFieldDriverFactory, componentFactory);

export {protractorTextFieldTestkitFactory};
