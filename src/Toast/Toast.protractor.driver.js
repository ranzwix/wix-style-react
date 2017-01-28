const toastDriverFactory = component => ({
  click: () => component.click(),
  getToastText: () => component.$(`[data-hook="toast-text"]`).getText(),
  element: () => component
});

export default toastDriverFactory;
