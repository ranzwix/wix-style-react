import {enzymeTestkitFactoryCreator} from '../src/test-common';

import buttonSelectionDriverFactory from '../src/ButtonSelection/ButtonSelection.driver';
export const buttonSelectionTestkitFactory = enzymeTestkitFactoryCreator(buttonSelectionDriverFactory);

import inputDriverFactory from '../src/Input/Input.driver';
export const inputTestkitFactory = enzymeTestkitFactoryCreator(inputDriverFactory);

import labelDriverFactory from '../src/Label/Label.driver';
export const labelTestkitFactory = enzymeTestkitFactoryCreator(labelDriverFactory);

import breadcrumbsDriverFactory from '../src/Breadcrumbs/Breadcrumbs.driver';
export const breadcrumbsTestkitFactory = enzymeTestkitFactoryCreator(breadcrumbsDriverFactory);

import dropdownLayoutDriverFactory from '../src/DropdownLayout/DropdownLayout.driver';
export const dropdownLayoutTestkitFactory = enzymeTestkitFactoryCreator(dropdownLayoutDriverFactory);

import inputWithOptionsDriverFactory from '../src/InputWithOptions/InputWithOptions.driver';
export const inputWithOptionsTestkitFactory = enzymeTestkitFactoryCreator(inputWithOptionsDriverFactory);

import autoCompleteDriverFactory from '../src/AutoComplete/AutoComplete.driver';
export const autoCompleteTestkitFactory = enzymeTestkitFactoryCreator(autoCompleteDriverFactory);

import dropdownDriverFactory from '../src/Dropdown/Dropdown.driver';
export const dropdownTestkitFactory = enzymeTestkitFactoryCreator(dropdownDriverFactory);

import multiSelectDriverFactory from '../src/MultiSelect/MultiSelect.driver';
export const multiSelectTestkitFactory = enzymeTestkitFactoryCreator(multiSelectDriverFactory);

import tagDriverFactory from '../src/Tag/Tag.driver';
export const tagTestkitFactory = enzymeTestkitFactoryCreator(tagDriverFactory);

import checkboxDriverFactory from '../src/Checkbox/Checkbox.driver';
export const checkboxTestkitFactory = enzymeTestkitFactoryCreator(checkboxDriverFactory);

import buttonDriverFactory from '../src/Button/Button.driver';
export const buttonTestkitFactory = enzymeTestkitFactoryCreator(buttonDriverFactory);


export {toastTestkitFactory} from '../src/Toast/testkit/Toast.enzyme';
