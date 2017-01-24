
import React, {PropTypes} from 'react';
import classNames from 'classnames';
import InputAreaSuffix from './InputAreaSuffix';
import WixComponent from '../WixComponent';

import styles from './InputArea.scss';

class InputArea extends WixComponent {

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
      defaultValue,
      error,
      forceFocus,
      forceHover,
      id,
      onChange,
      onKeyUp,
      placeholder,
      readOnly,
      rtl,
      tabIndex,
      rows,
      value,
      minHeight,
      maxHeight,
      fixedSize,
      theme
    } = this.props;

    const inlineStyle = {};

    if (minHeight) {
      inlineStyle.minHeight = minHeight;
    }

    if (maxHeight) {
      inlineStyle.maxHeight = maxHeight;
    }

    const classes = classNames({
      [styles.root]: true,
      [styles[`theme-${theme}`]]: true,
      [styles.rtl]: !!rtl,
      [styles.hasError]: !!error,
      [styles.hasHover]: forceHover,
      [styles.hasFocus]: forceFocus || this.state.focus,
      [styles.fixedSize]: !!fixedSize
    });

    return (
      <div className={classes}>
        <textarea
          rows={rows}
          ref={ref => this.textArea = ref}
          className={styles.inputArea}
          id={id}
          style={inlineStyle}
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
          onFocus={this._onFocus}
          />
        {theme === 'material' && <div className={styles.bar}/>}
      </div>
    );
  }

  focus() {
    this.textArea && this.textArea.focus();
  }

  blur() {
    this.textArea && this.textArea.blur();
  }

  select() {
    this.textArea && this.textArea.select();
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

    if (e.key === 'Enter') {
      this.props.onEnterPressed && this.props.onEnterPressed();
    } else if (e.key === 'Escape') {
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
  defaultValue: PropTypes.string,
  tabIndex: PropTypes.number,
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
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  rows: PropTypes.number,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  fixedSize: PropTypes.bool
};

export default InputArea;
