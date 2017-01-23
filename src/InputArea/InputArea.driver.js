import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import InputArea from './InputArea';
import styles from './InputArea.scss';
import $ from 'jquery';

const inputDriverFactory = ({component, wrapper}) => {
  const $component = $(component);
  const textArea = $component.find('textarea')[0];
  const clearButton = $(component).find(`.${styles.clearButton}`);

  return {
    trigger: (trigger, event) => ReactTestUtils.Simulate[trigger](textArea, event),
    focus: () => textArea.focus(),
    clickClear: () => ReactTestUtils.Simulate.click(clearButton[0]),
    enterText: text => ReactTestUtils.Simulate.change(textArea, {target: {value: text}}),
    getValue: () => textArea.value,
    getPlaceholder: () => textArea.placeholder,
    getDefaultValue: () => textArea.defaultValue,
    getTabIndex: () => textArea.tabIndex,
    getReadOnly: () => textArea.readOnly,
    hasExclamation: () => $component.find(`.${styles.exclamation}`).length === 1,
    hasError: () => component.classList.contains(styles.hasError),
    isRTL: () => component.className.indexOf(styles.rtl) >= 0,
    isFocusedStyle: () => component.classList.contains(styles.hasFocus),
    isHoveredStyle: () => component.classList.contains(styles.hasHover),
    isOfStyle: style => component.classList.contains(styles[`theme-${style}`]),
    isFocus: () => document.activeElement === textArea,
    exists: () => !!textArea,
    hasIconLeft: () => !$component.find(`.${styles.prefix}`).is(':empty'),
    setProps: props => {
      ReactDOM.render(<div ref={r => component = r}><InputArea {...props}/></div>, wrapper);
    }
  };
};

export default inputDriverFactory;
