import {protractorTestkitFactoryCreator} from '../src/test-common';

import labelDriverFactory from '../src/Label/Label.protractor.driver';
export const labelTestkitFactory = protractorTestkitFactoryCreator(labelDriverFactory);

import buttonDriverFactory from '../src/Button/Button.protractor.driver';
export const buttonTestkitFactory = protractorTestkitFactoryCreator(buttonDriverFactory);

import toastDriverFactory from '../src/Toast/Toast.protractor.driver';
export const toastTestkitFactory = protractorTestkitFactoryCreator(toastDriverFactory);
