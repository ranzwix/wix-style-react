import React from 'react';
import breadcrumbsDriverFactory from './Breadcrumbs.driver';
import {createDriverFactory} from '../test-common';
import {breadcrumbsTestkitFactory} from '../../testkit';
import Breadcrumbs from './Breadcrumbs';
import ReactTestUtils from 'react-addons-test-utils';
import {breadcrumbsTestkitFactory as enzymeBreadcrumbsTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Breadcrumbs', () => {
  const createDriver = createDriverFactory(breadcrumbsDriverFactory);
  const items = [
    {id: 0, value: 'Option 1'},
    {id: 1, value: 'Option 2'}
  ];
  let onClick;
  let driver;

  function createComopnent(props) {
    driver = createDriver(<Breadcrumbs {...props}/>);
  }

  beforeEach(() => {
    onClick = jest.fn();
  });

  it('should have correct text on each breadcrumb', () => {
    createComopnent({onClick, items});
    expect(driver.breadcrumbContentAt(0)).toBe(items[0].value);
    expect(driver.breadcrumbContentAt(1)).toBe(items[1].value);
  });

  it('should call onClick callback on click with correct item', () => {
    createComopnent({onClick, items});
    const itemIndex = 1;

    driver.clickBreadcrumbAt(itemIndex);
    expect(onClick).toBeCalledWith({id: items[itemIndex].id, value: 'Option 2'});
  });

  it('should get correct size from props', () => {
    const size = 'large';
    createComopnent({onClick, items, size});
    expect(driver.isLarge()).toBe(true);
  });

  it('should use medium size as default', () => {
    createComopnent({onClick, items});
    expect(driver.isMedium()).toBe(true);
  });

  it('should get theme from props', () => {
    const theme = 'onWhiteBackground';
    createComopnent({onClick, items, theme});
    expect(driver.isOnWhiteBackground()).toBe(true);
  });

  it('should use default theme gray background', () => {
    createComopnent({onClick, items});
    expect(driver.isOnGrayBackground()).toBe(true);
  });

  it('should get active id from props and have correct class', () => {
    const itemIndex = 1;
    createComopnent({onClick, items, activeId: items[itemIndex].id});
    expect(driver.getActiveItemId()).toBe(itemIndex);
  });

  describe('label appearance', () => {
    const itemIndex = 0;
    const activeItemIndex = 1;
    const activeId = items[activeItemIndex].id;

    describe('medium size', () => {
      const size = 'medium';

      it('should have t3.1 appearance when onWhiteBackground style and t3 for active', () => {
        const theme = 'onWhiteBackground';
        createComopnent({onClick, items, theme, size, activeId});
        expect(driver.getLabelClassList(itemIndex)).toContain('t3_1');
        expect(driver.getLabelClassList(activeItemIndex)).toContain('t3');
      });

      it('should have t3.1 appearance when onGrayBackground style and t3 for active', () => {
        const theme = 'onGrayBackground';
        createComopnent({onClick, items, theme, size, activeId});
        expect(driver.getLabelClassList(itemIndex)).toContain('t3_1');
        expect(driver.getLabelClassList(activeItemIndex)).toContain('t3');
      });

      it('should have t3.2 appearance when onDarkBackground style', () => {
        const theme = 'onDarkBackground';
        createComopnent({onClick, items, theme, size, activeId});
        expect(driver.getLabelClassList(itemIndex)).toContain('t3_2');
      });
    });

    describe('large size', () => {
      const size = 'large';

      it('should have t1.1 appearance when onWhiteBackground style and t1 for active', () => {
        const theme = 'onWhiteBackground';
        createComopnent({onClick, items, theme, size, activeId});
        expect(driver.getLabelClassList(itemIndex)).toContain('t1_1');
        expect(driver.getLabelClassList(activeItemIndex)).toContain('t1');
      });

      it('should have t1.1 appearance when onWhiteBackground style and t1 for active', () => {
        const theme = 'onGrayBackground';
        createComopnent({onClick, items, theme, size, activeId});
        expect(driver.getLabelClassList(itemIndex)).toContain('t1_1');
        expect(driver.getLabelClassList(activeItemIndex)).toContain('t1');
      });

      it('should have t1.2 appearance when onDarkBackground style', () => {
        const theme = 'onDarkBackground';
        createComopnent({onClick, items, theme, size, activeId});
        expect(driver.getLabelClassList(itemIndex)).toContain('t1_2');
      });
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Breadcrumbs onClick={onClick} items={items} dataHook={dataHook}/></div>));
      const breadcrumbsTestkit = breadcrumbsTestkitFactory({wrapper, dataHook});
      expect(breadcrumbsTestkit.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Breadcrumbs onClick={onClick} items={items} dataHook={dataHook}/>);
      const breadcrumbsTestkit = enzymeBreadcrumbsTestkitFactory({wrapper, dataHook});
      expect(breadcrumbsTestkit.exists()).toBeTruthy();
    });
  });
});
