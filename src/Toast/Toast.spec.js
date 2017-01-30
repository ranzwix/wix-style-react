import React from 'react';
import _ from 'lodash/fp';
import {componentFactory, toastDriverFactory} from './testkit/Toast';

describe('Toast', () => {
  const createDriver = _.compose(toastDriverFactory, componentFactory);
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      id: 'some-id',
      show: true,
      type: 'largebar',
      position: 'topfixed',
      theme: 'blue',
      onClose: jest.fn(),
      children: <div>text</div>
    };
  });

  it('should not show the Toast', () => {
    const props = Object.assign({}, defaultProps, {show: false});
    const driver = createDriver(props);
    expect(driver.toastExists()).toEqual(false);
  });

  it('should show a Toast text', () => {
    const driver = createDriver(defaultProps);
    const innerComponentText = defaultProps.children.props.children;
    expect(driver.toastExists()).toEqual(true);
    expect(driver.getToastText()).toEqual(innerComponentText);
  });

  it('should add an id to the Toast', () => {
    const driver = createDriver(defaultProps);
    expect(driver.hasId(defaultProps.id)).toBeTruthy();
  });

  it('should call the callback function when clicking close', () => {
    const driver = createDriver(defaultProps);
    driver.clickOnClose();
    expect(defaultProps.onClose.mock.calls.length).toBeGreaterThan(0);
  });

  it('should set the correct theme', () => {
    const driver = createDriver(defaultProps);
    expect(driver.hasTheme(defaultProps.theme)).toEqual(true);
  });

  it('should accept top property styling', () => {
    const props = Object.assign({}, defaultProps, {top: '5px'});
    const driver = createDriver(props);
    expect(driver.getTopProperty()).toEqual(props.top);
  });

});
