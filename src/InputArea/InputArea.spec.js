import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import inputAreaDriverFactory from './InputArea.driver';
import InputArea from './InputArea';
import {createDriverFactory} from '../test-common';
import {inputAreaTestkitFactory} from '../../testkit';
import {inputAreaTestkitFactory as enzymeInputAreaTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';


describe('InputArea', () => {
  const createDriver = createDriverFactory(inputAreaDriverFactory);

  describe('value attribute', () => {
    it('should pass down to the wrapped input', () => {
      const props = {
        value: 'hello',
        onChange: () => {}
      };

      const driver = createDriver(<InputArea {...props}/>);
      expect(driver.getValue()).toEqual(props.value);
    });
  });

  describe('defaultValue attribute', () => {
    it('should pass down to the wrapped input', () => {
      const defaultValue = 'hello';

      const driver = createDriver(<InputArea defaultValue={defaultValue}/>);
      expect(driver.getDefaultValue()).toEqual(defaultValue);
    });
  });

  describe('rows attribute', () => {
    it('should pass down to the wrapped input', () => {
      const rows = 5;

      const driver = createDriver(<InputArea rows={rows}/>);
      expect(driver.getRowsCount()).toEqual(rows);
    });
  });

  describe('maxHeight attribute', () => {
    it('should pass down to the wrapped input', () => {
      const maxHeight = '50px';

      const driver = createDriver(<InputArea maxHeight={maxHeight}/>);
      expect(driver.getStyle().maxHeight).toEqual(maxHeight);
    });
  });

  describe('resizable attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<InputArea resizable/>);
      expect(driver.getResizable()).toBeTruthy();
    });

    it('should pass down to the wrapped input with default false value', () => {
      const driver = createDriver(<InputArea/>);
      expect(driver.getResizable()).toBeFalsy();
    });
  });

  describe('rows attribute', () => {
    it('should pass down to the wrapped input', () => {
      const rows = 5;

      const driver = createDriver(<InputArea rows={rows}/>);
      expect(driver.getRowsCount()).toEqual(rows);
    });
  });

  describe('tabIndex attribute', () => {
    it('should pass down to the wrapped input', () => {
      const tabIndex = 1;

      const driver = createDriver(<InputArea tabIndex={tabIndex}/>);
      expect(driver.getTabIndex()).toEqual(tabIndex);
    });
  });

  describe('readOnly attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<InputArea readOnly/>);
      expect(driver.getReadOnly()).toBeTruthy();
    });

    it('should pass down to the wrapped input with default false value', () => {
      const driver = createDriver(<InputArea/>);
      expect(driver.getReadOnly()).toBeFalsy();
    });
  });

  describe('error attribute', () => {
    it('should display an error icon if error is true', () => {
      const driver = createDriver(<InputArea error/>);

      expect(driver.hasExclamation()).toBeTruthy();
      expect(driver.hasError()).toBeTruthy();
    });
  });

  describe('onChange attribute', () => {
    it('should be called when text is entered to the input', () => {

      const onChange = jest.fn();
      const event = {target: {value: 'world'}};

      const driver = createDriver(<InputArea onChange={onChange}/>);

      driver.trigger('change', event);

      expect(onChange).toBeCalled();
    });
  });

  describe('onKeyUp attribute', () => {
    it('should be called after keybord key got pressed and then released', () => {
      const onKeyUp = jest.fn();
      const event = {target: {value: 'world'}};

      const driver = createDriver(<InputArea onKeyUp={onKeyUp}/>);

      driver.trigger('keyUp', event);

      expect(onKeyUp).toBeCalled();
    });
  });

  describe('onFocus attribute', () => {
    it('should be called when the input gets focused', () => {
      const onFocus = jest.fn();
      const driver = createDriver(<InputArea onFocus={onFocus}/>);

      driver.trigger('focus');

      expect(onFocus).toBeCalled();
    });
  });

  describe('onBlur attribute', () => {
    it('should be called when the input gets blured', () => {
      const onBlur = jest.fn();
      const driver = createDriver(<InputArea onBlur={onBlur}/>);

      driver.trigger('blur');

      expect(onBlur).toBeCalled();
    });
  });

  describe('onKeyDown attribute', () => {
    it('should be called when text is entered to the wrapped input', () => {
      const onKeyDown = jest.fn();
      const event = {keyCode: 40};

      const driver = createDriver(<InputArea onKeyDown={onKeyDown}/>);

      driver.trigger('keyDown', event);

      expect(onKeyDown).toBeCalled();
    });
  });

  describe('forceFocus attribute', () => {
    it('should have focus class on input if forceFocus is true', () => {
      const driver = createDriver(<InputArea forceFocus/>);
      expect(driver.isFocusedStyle()).toBeTruthy();
    });
  });

  describe('forceHover attribute', () => {
    it('should have hover class on input if forceHover is true', () => {
      const driver = createDriver(<InputArea forceHover/>);
      expect(driver.isHoveredStyle()).toBeTruthy();
    });

    it('should be hovered if forceFocus is false and forceHover is true', () => {
      const driver = createDriver(<InputArea forceHover forceFocus={false}/>);
      expect(driver.isHoveredStyle()).toBeTruthy();
    });
  });

  describe('autoFocus attribute', () => {
    it('Mounting an input element with autoFocus=false, should give it the focus', () => {
      let autoFocus = false;
      const driver = createDriver(<InputArea autoFocus={false}/>);
      expect(driver.isFocus()).toBeFalsy();
      autoFocus = true;
      driver.setProps({autoFocus});
      expect(driver.isFocus()).toBeFalsy();
    });

    it('Mounting an input element with autoFocus=true, gives it the focus', () => {
      const driver = createDriver(<InputArea autoFocus/>);
      expect(driver.isFocus()).toBeTruthy();
    });
  });

  describe('focus function', () => {
    it('calling focus should give focus to the input', () => {
      const driver = createDriver(<InputArea autoFocus={false}/>);
      expect(driver.isFocus()).toBeFalsy();
      driver.focus();
      expect(driver.isFocus()).toBeTruthy();
    });
  });

  describe('theme attribute', () => {
    it('should set the theme by default to "normal"', () => {
      const driver = createDriver(<InputArea/>);
      expect(driver.isOfStyle('normal')).toBeTruthy();
    });

    it('should allowing setting the theme to "paneltitle"', () => {
      const driver = createDriver(<InputArea theme="paneltitle"/>);
      expect(driver.isOfStyle('paneltitle')).toBeTruthy();
    });

    it('should allow setting the theme to "material"', () => {
      const driver = createDriver(<InputArea theme="material"/>);
      expect(driver.isOfStyle('material')).toBeTruthy();
    });
  });
});

describe('testkit', () => {
  it('should exist', () => {
    const div = document.createElement('div');
    const value = 'hello';
    const onChange = () => {};
    const dataHook = 'myDataHook';
    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div><InputArea value={value} onChange={onChange} dataHook={dataHook}/></div>));
    const inputAreaTestkit = inputAreaTestkitFactory({wrapper, dataHook});
    expect(inputAreaTestkit.exists()).toBeTruthy();
  });
});

describe('enzyme testkit', () => {
  it('should exist', () => {
    const value = 'hello';
    const onChange = () => {};
    const dataHook = 'myDataHook';
    const wrapper = mount(<InputArea value={value} onChange={onChange} dataHook={dataHook}/>);
    const inputAreaTestkit = enzymeInputAreaTestkitFactory({wrapper, dataHook});
    expect(inputAreaTestkit.exists()).toBeTruthy();
  });
});
