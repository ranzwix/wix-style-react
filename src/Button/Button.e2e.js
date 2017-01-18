import eyes from 'eyes.it';
// import {protractorButtonTestkitFactory} from './testkit/Button.protractor';

describe('Button', () => {
  eyes.it('should click a button', () => {

    // const driver = protractorButtonTestkitFactory({id: 'button'});

    browser.get('iframe.html?selectedKind=3.%20Buttons&selectedStory=3.1%20Standard');

    // const EC = protractor.ExpectedConditions;
    // browser.wait(EC.visibilityOf(driver.element()), 15000);

    // driver.click();
    // expect(driver.getButtonText()).toBe('Clicked!');
  });
});
