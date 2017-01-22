import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import styles from './Button.scss';
import buttonDriverFactory from './Button.driver';
import Button from './Button';
import {createDriverFactory} from '../test-common';
import {buttonTestkitFactory} from '../../testkit';
import {buttonTestkitFactory as enzymeButtonTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';


describe('Button', () => {

  const createDriver = createDriverFactory(buttonDriverFactory);

  it('should click a button', () => {
    const onClick = jest.fn();
    const driver = createDriver(<Button onClick={onClick}/>);

    driver.click();
    expect(onClick).toBeCalled();
  });

  it('should render children', () => {
    const children = '<div>123</div>';
    const driver = createDriver(<Button>{children}</Button>);

    expect(driver.getButtonTextContent()).toBe(children);
  });

  it('should get disabled class', () => {
    const driver = createDriver(<Button disabled={true}/>);

    expect(driver.isButtonDisabled()).toBe(true);
  });

  it('should have default "fullblue" style', () => {
    const driver = createDriver(<Button/>);

    expect(driver.doesComponentHasClass(styles.fullblue)).toBeTruthy();
  });

  it('should get "small" height class', () => {
    const height = `${styles.small}`;
    const driver = createDriver(<Button height={height}/>);

    expect(driver.doesComponentHasClass(`height${styles.small}`)).toBeTruthy();
  });

  it('should get "large" height class', () => {
    const height = `${styles.large}`;
    const driver = createDriver(<Button height={height}/>);

    expect(driver.doesComponentHasClass(`height${styles.large}`)).toBe(true);
  });

  it('should get custom style', () => {
    const theme = 'emptyblue';
    const driver = createDriver(<Button theme={theme}/>);

    expect(driver.doesComponentHasClass(styles[theme])).toBeTruthy();
  });

  it('should get "hover" class', () => {
    const driver = createDriver(<Button hover={true}/>);

    expect(driver.isComponentHovered()).toBeTruthy();
  });
});

describe('testkit', () => {
  it('should exist', () => {
    const div = document.createElement('div');
    const dataHook = 'myDataHook';
    const onClick = jest.fn();
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Button onClick={onClick} dataHook={dataHook}/></div>));
    const buttonTestkit = buttonTestkitFactory({wrapper, dataHook});
    expect(buttonTestkit.exists()).toBeTruthy();
  });
});

describe('enzyme testkit', () => {
  it('should exist', () => {
    const dataHook = 'myDataHook';
    const onClick = jest.fn();
    const wrapper = mount(<Button onClick={onClick} dataHook={dataHook}/>);
    const buttonTestkit = enzymeButtonTestkitFactory({wrapper, dataHook});
    expect(buttonTestkit.exists()).toBeTruthy();
  });
});
