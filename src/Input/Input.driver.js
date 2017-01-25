import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import Input from './Input';
import styles from './Input.scss';

const inputDriverFactory = ({component, wrapper}) => {
  const input = component.querySelector('input');
  const clearButton = component.querySelector(`.${styles.clearButton}`);

  return {
    trigger: (trigger, event) => ReactTestUtils.Simulate[trigger](input, event),
    focus: () => input.focus(),
    clickClear: () => ReactTestUtils.Simulate.click(clearButton),
    enterText: text => ReactTestUtils.Simulate.change(input, {target: {value: text}}),
    getValue: () => input.value,
    getPlaceholder: () => input.placeholder,
    getDefaultValue: () => input.defaultValue,
    getTabIndex: () => input.tabIndex,
    getReadOnly: () => input.readOnly,
    getType: () => input.type,
    hasPrefix: () => component.querySelectorAll(`.${styles.prefix}`).length === 1,
    hasSuffix: () => component.querySelectorAll(`.${styles.suffix}`).length === 1,
    prefixComponentExists: style => !!component.querySelector(`.${styles.prefix} ${style}`),
    suffixComponentExists: style => !!component.querySelector(`.${styles.suffix} ${style}`),
    hasExclamation: () => !!component.querySelector(`.${styles.exclamation}`),
    hasError: () => component.classList.contains(styles.hasError),
    getUnit: () => component.querySelector(`.${styles.unit}`).textContent,
    hasMagnifyingGlass: () => !!component.querySelector(`.${styles.magnifyingGlass}`),
    hasMenuArrow: () => !!component.querySelector(`.${styles.menuArrow}`),
    hasClearButton: () => !!clearButton,
    isRTL: () => component.className.indexOf(styles.rtl) >= 0,
    isFocusedStyle: () => component.classList.contains(styles.hasFocus),
    isHoveredStyle: () => component.classList.contains(styles.hasHover),
    isOfStyle: style => component.classList.contains(styles[`theme-${style}`]),
    isOfSize: size => component.classList.contains(styles[`size-${size}`]),
    isFocus: () => document.activeElement === input,
    exists: () => !!component.querySelector('input'),
    hasIconLeft: () => !!component.querySelectorAll(`.${styles.prefix}`),
    setProps: props => {
      ReactDOM.render(<div ref={r => component = r}><Input {...props}/></div>, wrapper);
    }
  };
};

export default inputDriverFactory;
