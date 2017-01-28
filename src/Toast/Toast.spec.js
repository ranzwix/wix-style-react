import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import Toast from './Toast';
import toastDriverFactory from './Toast.driver';
import {createDriverFactory} from '../test-common';
import {toastTestkitFactory} from '../../testkit';
import {toastTestkitFactory as enzymeToastTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Toast', () => {
  const createDriver = createDriverFactory(toastDriverFactory);
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
    const driver = createDriver(<Toast {...props}/>);
    expect(driver.isVisible()).toBeFalsy();
  });

  it('should show a Toast text', () => {
    const driver = createDriver(<Toast {...defaultProps}/>);
    const innerComponentText = defaultProps.children.props.children;
    expect(driver.isVisible()).toBeTruthy();
    expect(driver.getToastText()).toEqual(innerComponentText);
  });

  it('should add an id to the Toast', () => {
    const driver = createDriver(<Toast {...defaultProps}/>);
    expect(driver.hasId(defaultProps.id)).toBeTruthy();
  });

  it('should call the callback function when clicking close', () => {
    const driver = createDriver(<Toast {...defaultProps}/>);
    driver.clickOnClose();
    expect(defaultProps.onClose.mock.calls.length).toBeGreaterThan(0);
  });

  it('should set the correct theme', () => {
    const driver = createDriver(<Toast {...defaultProps}/>);
    expect(driver.hasTheme(defaultProps.theme)).toBeTruthy();
  });

  it('should accept top property styling', () => {
    const props = Object.assign({}, defaultProps, {top: '5px'});
    const driver = createDriver(<Toast {...props}/>);
    expect(driver.getTopProperty()).toEqual(props.top);
  });

  describe('testkit', () => {
    it('should create new driver', () => {
      const div = document.createElement('div');
      const dataHook = 'toast';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Toast dataHook={dataHook} {...defaultProps}/></div>));
      const toastTestkit = toastTestkitFactory({wrapper, dataHook});
      expect(toastTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should create new driver', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Toast dataHook={dataHook} {...defaultProps}/>);
      const toastTestkit = enzymeToastTestkitFactory({wrapper, dataHook});
      expect(toastTestkit.exists()).toBeTruthy();
    });
  });
});
