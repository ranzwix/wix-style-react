import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import tooltipDriverFactory from './Tooltip.driver';
import Tooltip from './Tooltip';
import TooltipContent from './TooltipContent';
import {createDriverFactory} from '../test-common';
import {tooltipTestkitFactory} from '../../testkit';
import {tooltipTestkitFactory as enzymeTooltipTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Tooltip', () => {

  const createDriver = createDriverFactory(tooltipDriverFactory);
  const _props = {showDelay: 5, hideDelay: 5, content: <TooltipContent children={'I\'m the content'}/>};
  const children = <div>Here there is a children</div>;

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should be hidden by default', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    expect(driver.isShown()).toBeFalsy();
  });

  it('should show a tooltip once hovering', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.isShown()).toBeFalsy();
    return resolveIn(30).then(() => {
      expect(driver.isShown()).toBeTruthy();
    });
  });

  it('should not override focus event', () => {
    const onFocus = jest.fn();
    const onFocusedChild = <div onFocus={onFocus}>Here there is a children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onFocusedChild}</Tooltip>);
    driver.focus();
    expect(onFocus).toBeCalled();
  });

  it('should not override blur event', () => {
    const onBlur = jest.fn();
    const onBluredChild = <div onBlur={onBlur}>Here there is a children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onBluredChild}</Tooltip>);
    driver.blur();
    expect(onBlur).toBeCalled();
  });

  it('should not override click event', () => {
    const onClick = jest.fn();
    const onClickedChild = <div onClick={onClick}>Here there is a children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onClickedChild}</Tooltip>);
    driver.click();
    expect(onClick).toBeCalled();
  });

  it('should not override mouse enter event', () => {
    const onMouseEnter = jest.fn();
    const onMouseEnteredChild = <div onMouseEnter={onMouseEnter}>Here there is a children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onMouseEnteredChild}</Tooltip>);
    driver.mouseEnter();
    expect(onMouseEnter).toBeCalled();
  });

  it('should not override mouse leave event', () => {
    const onMouseLeave = jest.fn();
    const onMouseLeavedChild = <div onMouseLeave={onMouseLeave}>Here there is a children</div>;
    const driver = createDriver(<Tooltip {..._props}>{onMouseLeavedChild}</Tooltip>);
    driver.mouseLeave();
    expect(onMouseLeave).toBeCalled();
  });

  it('should support error theme', () => {
    const driver = createDriver(<Tooltip theme={'error'} {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.hasErrorTheme()).toBeFalsy();
    return resolveIn(30).then(() => {
      expect(driver.hasErrorTheme()).toBeTruthy();
    });
  });

  it('should support dark theme', () => {
    const driver = createDriver(<Tooltip theme={'dark'} {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.hasDarkTheme()).toBeFalsy();
    return resolveIn(30).then(() => {
      expect(driver.hasDarkTheme()).toBeTruthy();
    });
  });

  it('should support light theme', () => {
    const driver = createDriver(<Tooltip theme={'light'} {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    expect(driver.hasLightTheme()).toBeFalsy();
    return resolveIn(30).then(() => {
      expect(driver.hasLightTheme()).toBeTruthy();
    });
  });

  it('should have a children', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    expect(driver.getChildren()).toBe('Here there is a children');
  });

  it('should have a content', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    return resolveIn(30).then(() => {
      expect(driver.getContent()).toBe('I\'m the content');
    });
  });

  it('should cancel mouse leave, when followed by mouse enter immediately', () => {
    const driver = createDriver(<Tooltip {..._props}>{children}</Tooltip>);
    driver.mouseEnter();
    driver.mouseLeave();
    driver.mouseEnter();
    return resolveIn(30).then(() => {
      expect(driver.isShown()).toBe(true);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Tooltip dataHook={dataHook} {..._props}>{children}</Tooltip></div>));
      const driver = tooltipTestkitFactory({wrapper, dataHook});
      driver.mouseEnter();
      expect(driver.isShown()).toBeFalsy();
      return resolveIn(30).then(() => {
        expect(driver.isShown()).toBeTruthy();
      });
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Tooltip dataHook={dataHook} {..._props}>{children}</Tooltip>);
      const driver = enzymeTooltipTestkitFactory({wrapper, dataHook});
      driver.mouseEnter();
      expect(driver.isShown()).toBeFalsy();
      return resolveIn(30).then(() => {
        expect(driver.isShown()).toBeTruthy();
      });
    });
    it('should remove a tooltip immediately once the component is destroyed', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Tooltip dataHook={dataHook} {..._props} hideDelay={1000}>{children}</Tooltip>);
      const driver = enzymeTooltipTestkitFactory({wrapper, dataHook});
      driver.mouseEnter();
      return resolveIn(30).then(() => {
        expect(driver.isShown()).toBeTruthy();
        wrapper.unmount();
        return resolveIn(1);
      }).then(() => {
        expect(driver.isShown()).toBeFalsy();
      });
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
