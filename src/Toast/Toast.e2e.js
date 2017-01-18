import eyes from 'eyes.it';
// import {protractorToastTestkitFactory} from './testkit/Toast.protractor';

describe('Toast', () => {
  eyes.it('should click a button', () => {

    // const driver = protractorToastTestkitFactory({id: 'toast'});
    // const trigger = $('#fullblue-toast');

    browser.get('iframe.html?selectedKind=5.%20Others&selectedStory=5.3%20Toast');

    // const EC = protractor.ExpectedConditions;
    // browser.wait(EC.visibilityOf(trigger), 15000);

    // trigger.click();
    // expect(driver.getToastText()).toBe('Boo! I scared you with this very scary error message!\nThanks');
  });
});
