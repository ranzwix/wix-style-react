import _ from 'lodash/fp';

const toastDriverFactory = component => ({
  click: () => component.click(),
  getToastText: () => component.$(`[data-hook="toast-text"]`).getText(),
  element: () => component
});

const componentFactory = ({id}) => $(`#${id}`);

const protractorToastTestkitFactory = _.compose(toastDriverFactory, componentFactory);

export {protractorToastTestkitFactory};
