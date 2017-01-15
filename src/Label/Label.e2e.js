import eyes from 'eyes.it';
import {labelTestkitFactory} from '../../testkit/protractor';

describe('Label', () => {
  eyes.it('should focus on the input when clicked', () => {
    const driver = labelTestkitFactory({dataHook: 'label'});

    browser.get('iframe.html?selectedKind=7.%20Labels&selectedStory=7.1%20Standard');

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(driver.element()), 15000);

    driver.click();

    expect(browser.driver.switchTo().activeElement().getAttribute('id')).toEqual(driver.getAssociatedInput().then(input => input.getAttribute('id')));
  });
});
