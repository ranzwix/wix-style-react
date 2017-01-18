import React from 'react';
import {spy} from 'sinon';

import TooltipDriver from './Tooltip.driver';

describe('<Tooltip/>', () => {

  let driver;

  beforeEach(() => driver = new TooltipDriver());

  it('should be hidden by default', () => {
    driver
      .when.created(<div>Hover me</div>);

    expect(driver.get.isShown()).toEqual(false);
    expect(driver.get.willBeShown()).toEqual(false);
    expect(driver.get.willBeHidden()).toEqual(false);
  });

  it('should show a tooltip once hovering', () => {
    driver
      .given.props({
        showDelay: 10
      })
      .when.created(<div>Hover me</div>)
      .when.mouseEntered();

    expect(driver.get.isShown()).toEqual(false);
    expect(driver.get.willBeShown()).toEqual(true);
    expect(driver.get.willBeHidden()).toEqual(false);

    return resolveIn(15).then(() => {
      expect(driver.get.isShown()).toEqual(true);
      expect(driver.get.willBeShown()).toEqual(false);
      expect(driver.get.willBeHidden()).toEqual(false);
    });
  });

  it('should not override focus event', () => {
    const onFocus = spy();

    driver
      .given.props({
        showTrigger: 'custom',
        hideTrigger: 'custom'
      })
      .when.created(<div onFocus={onFocus}>Focus me</div>)
      .when.focused();

    expect(onFocus.calledOnce).toEqual(true);
  });

  it('should not override blur event', () => {
    const onBlur = spy();

    driver
      .given.props({
        showTrigger: 'custom',
        hideTrigger: 'custom'
      })
      .when.created(<div onBlur={onBlur}>Blur me</div>)
      .when.blured();

    expect(onBlur.calledOnce).toEqual(true);
  });

  it('should not override click event', () => {
    const onClick = spy();

    driver
      .given.props({
        showTrigger: 'custom',
        hideTrigger: 'custom'
      })
      .when.created(<div onClick={onClick}>Click me</div>)
      .when.clicked();

    expect(onClick.calledOnce).toEqual(true);
  });

  it('should not override mouse enter event', () => {
    const onMouseEnter = spy();

    driver
      .given.props({
        showTrigger: 'custom',
        hideTrigger: 'custom'
      })
      .when.created(<div onMouseEnter={onMouseEnter}>Move mouse over</div>)
      .when.mouseEntered();

    expect(onMouseEnter.calledOnce).toEqual(true);
  });

  it('should not override mouse leave event', () => {
    const onMouseLeave = spy();

    driver
      .given.props({
        showTrigger: 'custom',
        hideTrigger: 'custom'
      })
      .when.created(<div onMouseLeave={onMouseLeave}>Move mouse out</div>)
      .when.mouseLeft();

    expect(onMouseLeave.calledOnce).toEqual(true);
  });

  it('should be disabled', () => {
    driver
      .given.props({
        disabled: true
      })
      .when.created(<div>this is tooltip</div>)
      .when.mouseEntered();

    expect(driver.get.isShown()).toEqual(false);
  });

  it('should support error theme', () => {
    driver.given.props({theme: 'error', showDelay: 10, active: true, content: 'Error tooltip content'})
      .when.created(<div>this is an error tooltip</div>);

    return resolveIn(15).then(() => {
      expect(driver.get.isThemeError()).toEqual(true);
    });
  });
});

function resolveIn(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({});
    }, timeout);
  });
}
