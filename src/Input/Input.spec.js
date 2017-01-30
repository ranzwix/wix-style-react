import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import inputDriverFactory from './Input.driver';
import Input from './Input';
import sinon from 'sinon';
import {createDriverFactory} from '../test-common';
import {inputTestkitFactory} from '../../testkit';
import {inputTestkitFactory as enzymeInputTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';


describe('Input', () => {
  const createDriver = createDriverFactory(inputDriverFactory);

  describe('value attribute', () => {
    it('should pass down to the wrapped input', () => {
      const props = {
        value: 'hello',
        onChange: () => {}
      };

      const driver = createDriver(<Input {...props}/>);
      expect(driver.getValue()).toEqual(props.value);
    });
  });

  describe('defaultValue attribute', () => {
    it('should pass down to the wrapped input', () => {
      const defaultValue = 'hello';

      const driver = createDriver(<Input defaultValue={defaultValue}/>);
      expect(driver.getDefaultValue()).toEqual(defaultValue);
    });
  });

  describe('tabIndex attribute', () => {
    it('should pass down to the wrapped input', () => {
      const tabIndex = 1;

      const driver = createDriver(<Input tabIndex={tabIndex}/>);
      expect(driver.getTabIndex()).toEqual(tabIndex);
    });
  });

  describe('readOnly attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<Input readOnly/>);
      expect(driver.getReadOnly()).toBeTruthy();
    });

    it('should pass down to the wrapped input with default false value', () => {
      const driver = createDriver(<Input/>);
      expect(driver.getReadOnly()).toBeFalsy();
    });
  });

  describe('type attribute', () => {
    it('should set the type attribute', () => {
      const driver = createDriver(<Input type="number"/>);
      expect(driver.getType()).toBe('number');
    });
  });

  describe('error attribute', () => {
    it('should display an error icon if error is true', () => {
      const driver = createDriver(<Input error/>);

      expect(driver.hasExclamation()).toBeTruthy();
      expect(driver.hasError()).toBeTruthy();
    });
  });

  describe('unit attribute', () => {
    it('should the unit text if passed', () => {
      const unit = '$';

      const driver = createDriver(<Input unit={unit}/>);
      expect(driver.getUnit()).toEqual(unit);
    });
  });

  describe('magnifyingGlass attribute', () => {
    it('should display a magnifying glass icon if magnifyingGlass is true', () => {
      const driver = createDriver(<Input magnifyingGlass/>);
      expect(driver.hasMagnifyingGlass()).toBeTruthy();
    });

    it('should not display a magnifying glass icon if magnifyingGlass is false', () => {
      const driver = createDriver(<Input magnifyingGlass={false}/>);
      expect(driver.hasMagnifyingGlass()).toBeFalsy();
    });

    it('should not display a magnifying glass icon if error is true', () => {
      const driver = createDriver(<Input magnifyingGlass error/>);
      expect(driver.hasMagnifyingGlass()).toBeFalsy();
    });
  });

  describe('menuArrow attribute', () => {
    it('should display a menu arrow icon if menuArrow is true', () => {
      const driver = createDriver(<Input menuArrow/>);
      expect(driver.hasMenuArrow()).toBeTruthy();
    });

    it('should not display a menu arrow icon if menuArrow is false', () => {
      const driver = createDriver(<Input menuArrow={false}/>);
      expect(driver.hasMenuArrow()).toBeFalsy();
    });

    it('should not display a menu arrow icon if error is true', () => {
      const driver = createDriver(<Input menuArrow error/>);
      expect(driver.hasMenuArrow()).toBeFalsy();
    });

    it('should not display a menu arrow icon if magnifyingGlass is true', () => {
      const driver = createDriver(<Input menuArrow magnifyingGlass/>);
      expect(driver.hasMenuArrow()).toBeFalsy();
    });
  });

  describe('rtl attribute', () => {
    it('should have rtl if rtl prop is true', () => {
      const driver = createDriver(<Input rtl/>);
      expect(driver.isRTL()).toBeTruthy();
    });

    it('should not have rtl if rtl prop is false', () => {
      const driver = createDriver(<Input rtl={false}/>);
      expect(driver.isRTL()).toBeFalsy();
    });
  });

  describe('onChange attribute', () => {
    it('should be called when text is entered to the input', () => {

      const onChange = jest.fn();
      const event = {target: {value: 'world'}};

      const driver = createDriver(<Input onChange={onChange}/>);

      driver.trigger('change', event);

      expect(onChange).toBeCalled();
    });
  });

  describe('onKeyUp attribute', () => {
    it('should be called after keybord key got pressed and then released', () => {
      const onKeyUp = jest.fn();
      const event = {target: {value: 'world'}};

      const driver = createDriver(<Input onKeyUp={onKeyUp}/>);

      driver.trigger('keyUp', event);

      expect(onKeyUp).toBeCalled();
    });
  });

  describe('onFocus attribute', () => {
    it('should be called when the input gets focused', () => {
      const onFocus = jest.fn();
      const driver = createDriver(<Input onFocus={onFocus}/>);

      driver.trigger('focus');

      expect(onFocus).toBeCalled();
    });
  });

  describe('onBlur attribute', () => {
    it('should be called when the input gets blured', () => {
      const onBlur = jest.fn();
      const driver = createDriver(<Input onBlur={onBlur}/>);

      driver.trigger('blur');

      expect(onBlur).toBeCalled();
    });
  });

  describe('onKeyDown attribute', () => {
    it('should be called when text is entered to the wrapped input', () => {
      const onKeyDown = jest.fn();
      const event = {keyCode: 40};

      const driver = createDriver(<Input onKeyDown={onKeyDown}/>);

      driver.trigger('keyDown', event);

      expect(onKeyDown).toBeCalled();
    });
  });

  describe('forceFocus attribute', () => {
    it('should have focus class on input if forceFocus is true', () => {
      const driver = createDriver(<Input forceFocus/>);
      expect(driver.isFocusedStyle()).toBeTruthy();
    });
  });

  describe('forceHover attribute', () => {
    it('should have hover class on input if forceHover is true', () => {
      const driver = createDriver(<Input forceHover/>);
      expect(driver.isHoveredStyle()).toBeTruthy();
    });

    it('should be hovered if forceFocus is false and forceHover is true', () => {
      const driver = createDriver(<Input forceHover forceFocus={false}/>);
      expect(driver.isHoveredStyle()).toBeTruthy();
    });
  });

  describe('disable attribute', () => {
    it('should have disabled class on input if disabled is true', () => {
      const driver = createDriver(<Input disabled/>);
      expect(driver.isDisabled()).toBeTruthy();
    });
  });

  describe('autoFocus attribute', () => {
    it('Mounting an input element with autoFocus=false, should give it the focus', () => {
      let autoFocus = false;
      const driver = createDriver(<Input autoFocus={false}/>);
      expect(driver.isFocus()).toBeFalsy();
      autoFocus = true;
      driver.setProps({autoFocus});
      expect(driver.isFocus()).toBeFalsy();
    });

    it('Mounting an input element with autoFocus=true, gives it the focus', () => {
      const driver = createDriver(<Input autoFocus/>);
      expect(driver.isFocus()).toBeTruthy();
    });
  });

  describe('focus function', () => {
    it('calling focus should give focus to the input', () => {
      const driver = createDriver(<Input autoFocus={false}/>);
      expect(driver.isFocus()).toBeFalsy();
      driver.focus();
      expect(driver.isFocus()).toBeTruthy();
    });
  });

  describe('theme attribute', () => {
    it('should set the theme by default to "normal"', () => {
      const driver = createDriver(<Input/>);
      expect(driver.isOfStyle('normal')).toBeTruthy();
    });

    it('should allowing setting the theme to "paneltitle"', () => {
      const driver = createDriver(<Input theme="paneltitle"/>);
      expect(driver.isOfStyle('paneltitle')).toBeTruthy();
    });

    it('should allow setting the theme to "material"', () => {
      const driver = createDriver(<Input theme="material"/>);
      expect(driver.isOfStyle('material')).toBeTruthy();
    });
  });

  describe('onClear attribute', () => {
    it('should not be displayed when text is empty', () => {
      const onClear = () => {};
      const onChange = () => {};
      const driver = createDriver(<Input onClear={onClear} value="" onChange={onChange}/>);
      expect(driver.hasClearButton()).toBeFalsy();
    });

    it('should display a X when text is not null, and be clickable', () => {
      const onClear = sinon.spy();
      const onChange = () => {};
      const driver = createDriver(<Input onClear={onClear} value={'some value'} onChange={onChange}/>);
      expect(driver.hasClearButton()).toBeTruthy();
      driver.clickClear();
      expect(onClear.calledOnce).toBeTruthy();
    });

    it('should display a left icon when one is passed', () => {
      const driver = createDriver(<Input iconLeft={<div/>}/>);
      expect(driver.hasIconLeft()).toBeTruthy();
    });
  });

  describe('size attribute', () => {
    it('should use "normal" size by default', () => {
      const driver = createDriver(<Input/>);
      expect(driver.isOfSize('normal')).toBeTruthy();
    });

    it('should use "small" size', () => {
      const driver = createDriver(<Input size="small"/>);
      expect(driver.isOfSize('small')).toBeTruthy();
    });

    it('should use "large" size', () => {
      const driver = createDriver(<Input size="large"/>);
      expect(driver.isOfSize('large')).toBeTruthy();
    });

  });

  describe('prefix attribute', () => {
    it('should allow adding a custom prefix component', () => {
      const driver = createDriver(<Input prefix={<div className="my-button"/>}/>);
      expect(driver.hasPrefix()).toBeTruthy();
      expect(driver.prefixComponentExists('.my-button')).toBeTruthy();
    });

    it('should allow adding a custom suffix component', () => {
      const driver = createDriver(<Input suffix={<div className="my-button"/>}/>);
      expect(driver.hasSuffix()).toBeTruthy();
      expect(driver.suffixComponentExists('.my-button')).toBeTruthy();
    });
  });
});

describe('testkit', () => {
  it('should exist', () => {
    const div = document.createElement('div');
    const value = 'hello';
    const onChange = () => {};
    const dataHook = 'myDataHook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><Input value={value} onChange={onChange} dataHook={dataHook}/></div>));
    const inputTestkit = inputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.exists()).toBeTruthy();
  });
});

describe('enzyme testkit', () => {
  it('should exist', () => {
    const value = 'hello';
    const onChange = () => {};
    const dataHook = 'myDataHook';
    const wrapper = mount(<Input value={value} onChange={onChange} dataHook={dataHook}/>);
    const inputTestkit = enzymeInputTestkitFactory({wrapper, dataHook});
    expect(inputTestkit.exists()).toBeTruthy();
  });
});
