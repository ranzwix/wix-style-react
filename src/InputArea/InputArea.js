import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import InputAreaSuffix from './InputAreaSuffix';

import styles from './InputArea.scss';

class InputArea extends Component {

  constructor(params) {
    super(params);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.select = this.select.bind(this);
  }

  state = {
    focus: false
  };

  componentDidMount() {
    this.props.autoFocus && this._onFocus();
  }

  render() {
    const {
      autoFocus,
      dataHook,
      defaultValue,
      error,
      forceFocus,
      forceHover,
      id,
      onChange,
      onClear,
      onKeyUp,
      placeholder,
      readOnly,
      rtl,
      style,
      tabIndex,
      rows,
      value
    } = this.props;

    let {theme} = this.props; // When deprecation ends. theme should move to const.

    if (style) {
      console.warn(deprecated('Jan 1st 2017', 'style', 'theme'));
      theme = style;
    }

    const classes = classNames({
      [styles.root]: true,
      [styles[`theme-${theme}`]]: true,
      [styles.rtl]: !!rtl,
      [styles.hasError]: !!error,
      [styles.hasHover]: forceHover,
      [styles.hasFocus]: forceFocus || this.state.focus
    });


    const myAttr = {'data-hook': dataHook};

    return (
      <div className={classes} {...myAttr}>
        <textarea
          rows={rows}
          ref={input => this.input = input}
          className={styles.inputArea}
          id={id}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onKeyDown={this._onKeyDown}
          onDoubleClick={this._onDoubleClick}
          placeholder={placeholder}
          tabIndex={tabIndex}
          autoFocus={autoFocus}
          onKeyUp={onKeyUp}
          readOnly={readOnly}
          />
        <InputAreaSuffix
          error={error}
          rtl={rtl}
          onClear={onClear}
          onFocus={this._onFocus}
          />
        {theme === 'material' && <div className={styles.bar}/>}
      </div>
    );
  }

  focus() {
    this.input && this.input.focus();
  }

  blur() {
    this.input && this.input.blur();
  }

  select() {
    this.input && this.input.select();
  }

  _onFocus() {
    this.setState({focus: true});
    this.props.onFocus && this.props.onFocus();

    if (this.props.autoSelect) {
      // Set timeout is needed here since onFocus is called before react
      // gets the reference for the input (specifically when autoFocus
      // is on. So setTimeout ensures we have the ref.input needed in select)
      setTimeout(() => this.select(), 0);
    }
  }

  _onBlur(e) {
    this.setState({focus: false});
    this.props.onBlur && this.props.onBlur(e);
  }

  _onKeyDown(e) {
    this.props.onKeyDown && this.props.onKeyDown(e);

    if (e.keyCode === 13 /* enter */) {
      this.props.onEnterPressed && this.props.onEnterPressed();
    } else if (e.keyCode === 27 /* esc */) {
      this.props.onEscapePressed && this.props.onEscapePressed();
    }
  }
}

InputArea.displayName = 'InputArea';

InputArea.defaultProps = {
  theme: 'normal',
  size: 'normal'
};

InputArea.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.oneOf(['normal', 'paneltitle', 'material']),
  theme: PropTypes.oneOf(['normal', 'paneltitle', 'material']),
  forceHover: PropTypes.bool,
  forceFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  unit: PropTypes.string,
  defaultValue: PropTypes.string,
  tabIndex: PropTypes.number,
  magnifyingGlass: PropTypes.bool,
  menuArrow: PropTypes.bool,
  rtl: PropTypes.bool,
  autoFocus: PropTypes.bool,
  autoSelect: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onEscapePressed: PropTypes.func,
  onEnterPressed: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  iconLeft: PropTypes.object,
  readOnly: PropTypes.bool,
  dataHook: PropTypes.string,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  rows: PropTypes.number
};

function deprecated(when, oldProp, newProp) {
  return [
    '[wix-style-react>Input] Warning.',
    `Property '${oldProp}' has been deprecated, and will be removed ${when}.`,
    `Please use '${newProp}' instead.`
  ].join(' ');
}

export default InputArea;
