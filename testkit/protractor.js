import {protractorTestkitFactoryCreator} from '../src/test-common';

import labelDriverFactory from '../src/Label/Label.protractor.driver';
export const labelTestkitFactory = protractorTestkitFactoryCreator(labelDriverFactory);

export {protractorButtonTestkitFactory} from '../src/Button/testkit/Button.protractor';
export {protractorToastTestkitFactory} from '../src/Toast/testkit/Toast.protractor';
