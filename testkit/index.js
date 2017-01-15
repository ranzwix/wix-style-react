import {testkitFactoryCreator} from '../src/test-common';

import buttonSelectionDriverFactory from '../src/ButtonSelection/ButtonSelection.driver';
export const buttonSelectionTestkitFactory = testkitFactoryCreator(buttonSelectionDriverFactory);

import inputDriverFactory from '../src/Input/Input.driver';
export const inputTestkitFactory = testkitFactoryCreator(inputDriverFactory);

import labelDriverFactory from '../src/Label/Label.driver';
export const labelTestkitFactory = testkitFactoryCreator(labelDriverFactory);

export {buttonTestkitFactory} from '../src/Button/testkit/Button';
export {checkboxDriverFactory} from '../src/Checkbox/Checkbox.driver';
export {radioGroupDriverFactory} from '../src/RadioGroup/RadioGroup.driver';
export {toastTestkitFactory} from '../src/Toast/testkit/Toast';
export {dropdownLayoutTestkitFactory} from '../src/DropdownLayout/testkit/DropdownLayout';
