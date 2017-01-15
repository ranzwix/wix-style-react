import {enzymeTestkitFactoryCreator} from '../src/test-common';

import buttonSelectionDriverFactory from '../src/ButtonSelection/ButtonSelection.driver';
export const buttonSelectionTestkitFactory = enzymeTestkitFactoryCreator(buttonSelectionDriverFactory);

import inputDriverFactory from '../src/Input/Input.driver';
export const inputTestkitFactory = enzymeTestkitFactoryCreator(inputDriverFactory);

import labelDriverFactory from '../src/Label/Label.driver';
export const labelTestkitFactory = enzymeTestkitFactoryCreator(labelDriverFactory);

export {buttonTestkitFactory} from '../src/Button/testkit/Button.enzyme';
export {toastTestkitFactory} from '../src/Toast/testkit/Toast.enzyme';
export {dropdownTestkitFactory} from '../src/Dropdown/testKit/Dropdown.enzyme';
