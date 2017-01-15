import eyes from 'eyes.it';
import labelDriverFactory from './Label.protractor.driver';
import {protractorCreateDriverFactory} from '../test-common';


describe('Label', () => {
  eyes.it('should focus on the input when clicked', () => {
    const createDriverFactory = protractorCreateDriverFactory(labelDriverFactory);
    const driver = createDriverFactory({dataHook: 'myDataHook'});

    browser.get('iframe.html?selectedKind=7.%20Labels&selectedStory=7.1%20Standard');

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(driver.element()), 15000);

    driver.click();

    expect(browser.driver.switchTo().activeElement().getAttribute('data-hook')).toEqual(driver.getAssociatedInput().then(input => input.getAttribute('data-hook')));
  });
});
