import {protractorTestkitFactoryCreator} from '../src/test-common';

import labelDriverFactory from '../src/Label/Label.protractor.driver';
export const labelTestkitFactory = protractorTestkitFactoryCreator(labelDriverFactory);

import buttonDriverFactory from '../src/Button/Button.protractor.driver';
export const buttonTestkitFactory = protractorTestkitFactoryCreator(buttonDriverFactory);

import textAreaDriverFactory from '../src/TextArea/TextArea.protractor.driver';
export const textAreaTestkitFactory = protractorTestkitFactoryCreator(textAreaDriverFactory);

import textFieldDriverFactory from '../src/TextField/TextField.protractor.driver';
export const textFieldTestkitFactory = protractorTestkitFactoryCreator(textFieldDriverFactory);

import autoCompleteCompositeDriverFactory from '../src/AutoCompleteComposite/AutoCompleteComposite.protractor.driver';
export const autoCompleteCompositeTestkitFactory = protractorTestkitFactoryCreator(autoCompleteCompositeDriverFactory);

import rangeDriverFactory from '../src/Range/Range.protractor.driver';
export const rangeTestkitFactory = protractorTestkitFactoryCreator(rangeDriverFactory);

import fieldWithSelectionCompositeDriverFactory from '../src/Composite/FieldWithSelectionComposite/FieldWithSelectionComposite.protractor.driver';
export const fieldWithSelectionCompositeTestkitFactory = protractorTestkitFactoryCreator(fieldWithSelectionCompositeDriverFactory);

import googleAddressWithInputDriverFactory from '../src/GoogleAddressInputWithLabel/GoogleAddressInputWithLabel.protractor.driver';
export const googleAddressWithInputTestkitFactory = protractorTestkitFactoryCreator(googleAddressWithInputDriverFactory);

export {protractorToastTestkitFactory} from '../src/Toast/testkit/Toast.protractor';
