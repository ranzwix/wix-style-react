import {testkitFactoryCreator} from '../src/test-common';

import buttonSelectionDriverFactory from '../src/ButtonSelection/ButtonSelection.driver';
export const buttonSelectionTestkitFactory = testkitFactoryCreator(buttonSelectionDriverFactory);

import inputDriverFactory from '../src/Input/Input.driver';
export const inputTestkitFactory = testkitFactoryCreator(inputDriverFactory);

import labelDriverFactory from '../src/Label/Label.driver';
export const labelTestkitFactory = testkitFactoryCreator(labelDriverFactory);

import breadcrumbsDriverFactory from '../src/Breadcrumbs/Breadcrumbs.driver';
export const breadcrumbsTestkitFactory = testkitFactoryCreator(breadcrumbsDriverFactory);

import dropdownLayoutDriverFactory from '../src/DropdownLayout/DropdownLayout.driver';
export const dropdownLayoutTestkitFactory = testkitFactoryCreator(dropdownLayoutDriverFactory);

import inputWithOptionsDriverFactory from '../src/InputWithOptions/InputWithOptions.driver';
export const inputWithOptionsTestkitFactory = testkitFactoryCreator(inputWithOptionsDriverFactory);

import autoCompleteDriverFactory from '../src/AutoComplete/AutoComplete.driver';
export const autoCompleteTestkitFactory = testkitFactoryCreator(autoCompleteDriverFactory);

export {buttonTestkitFactory} from '../src/Button/testkit/Button';
export {checkboxDriverFactory} from '../src/Checkbox/Checkbox.driver';
export {radioGroupDriverFactory} from '../src/RadioGroup/RadioGroup.driver';
export {toastTestkitFactory} from '../src/Toast/testkit/Toast';
