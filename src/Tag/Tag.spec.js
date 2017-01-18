import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import Tag from './Tag';
import tagDriverFactory from './Tag.driver';
import {createDriverFactory} from '../test-common';
import {tagTestkitFactory} from '../../testkit';
import {tagTestkitFactory as enzymeTagTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Tag', () => {

  const createDriver = createDriverFactory(tagDriverFactory);
  const id = 'myId', label = 'Hey', onRemove = jest.fn();

  it('should have a default small size', () => {
    const driver = createDriver(<Tag id={id}>{label}</Tag>);
    expect(driver.isLarge()).toBeFalsy();
  });

  it('should have a large size', () => {
    const driver = createDriver(<Tag id={id} size="large">{label}</Tag>);
    expect(driver.isLarge()).toBeTruthy();
  });

  it('should have a label', () => {
    const driver = createDriver(<Tag id={id}>{label}</Tag>);
    expect(driver.getLabel()).toBe(label);
  });

  it('should be removable by default', () => {
    const driver = createDriver(<Tag id={id}>{label}</Tag>);
    expect(driver.isRemovable()).toBeTruthy();
  });

  it('should not be removable', () => {
    const driver = createDriver(<Tag id={id} removable={false}>{label}</Tag>);
    expect(driver.isRemovable()).toBeFalsy();
  });

  it('should call onRemove function on remove', () => {
    const driver = createDriver(<Tag id={id} onRemove={onRemove}>{label}</Tag>);

    driver.removeTag();
    expect(onRemove).toBeCalledWith(id);
  });

  it('should not display thumb by default', () => {
    const driver = createDriver(<Tag id={id}>{label}</Tag>);
    expect(driver.isThumbExists()).toBeFalsy();
  });

  it('should display thumb', () => {
    const driver = createDriver(<Tag id={id} thumb={<span>Ho</span>}>{label}</Tag>);
    expect(driver.isThumbExists()).toBeTruthy();
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Tag id={id} dataHook={dataHook}>{label}</Tag></div>));
      const tagTestkit = tagTestkitFactory({wrapper, dataHook});
      expect(tagTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Tag id={id} dataHook={dataHook}>{label}</Tag>);
      const tagTestkit = enzymeTagTestkitFactory({wrapper, dataHook});
      expect(tagTestkit.exists()).toBeTruthy();
    });
  });
});
