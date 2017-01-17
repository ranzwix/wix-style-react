import React from 'react';
import Input from '../Input/Input.js';
import omit from 'lodash.omit';
import DropdownLayout from '../DropdownLayout/DropdownLayout';

class InputWithOptions extends React.Component {

  // Abstraction
  inputClasses() {}
  dropdownClasses() {}
  dropdownAdditionalProps() {}
  inputAdditionalProps() {}

  constructor(props) {
    super(props);

    this.state = {
      showOptions: false,
      inputValue: ''
    };

    this._onSelect = this._onSelect.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.select = this.select.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this._onManuallyInput = this._onManuallyInput.bind(this);
  }

  renderInput() {
    const {customInput} = this.props;
    const inputProps = Object.assign(omit(this.props, Object.keys(DropdownLayout.propTypes).concat(['onChange'])), this.inputAdditionalProps());
    if (customInput) {
      return React.cloneElement(customInput, {
        ref: input => this.input = input,
        ...inputProps
      });
    } else {
      return (
        <Input
          menuArrow
          ref={input => this.input = input}
          {...inputProps}
          onChange={event => {
            this.setState({inputValue: event.target.value});
            if (this.props.onChange) {
              this.props.onChange(event);
            }
          }}
          />
      );
    }
  }

  render() {
    const dropdownProps = Object.assign(omit(this.props, Object.keys(Input.propTypes)), this.dropdownAdditionalProps());

    return (
      <div id={this.props.id} onBlur={this._onBlur}>
        <div onKeyDown={this._onKeyDown} onFocus={this._onFocus} className={this.inputClasses()}>
          {this.renderInput()}
        </div>

        <div className={this.dropdownClasses()}>
          <DropdownLayout
            ref={dropdownLayout => this.dropdownLayout = dropdownLayout}
            {...dropdownProps}
            visible={this.state.showOptions}
            onClose={this.hideOptions}
            onSelect={this._onSelect}
            />
        </div>
      </div>
    );
  }

  hideOptions() {
    this.setState({showOptions: false});
  }

  showOptions() {
    this.setState({showOptions: true});
  }

  _onManuallyInput() {
    this.hideOptions();

    if (this.props.onManuallyInput) {
      this.props.onManuallyInput(this.state.inputValue);
    }
  }

  _onSelect(option) {
    const {onSelect, closeOnSelect} = this.props;

    if (closeOnSelect) {
      this._onBlur();
    }

    if (onSelect) {
      onSelect(option);
    }
  }

  _onBlur() {
    this.hideOptions();
  }

  _onFocus() {
    this.showOptions();
  }

  _onKeyDown(event) {
    if (!this.dropdownLayout._onKeyDown(event)) {
      switch (event.key) {
        case 'Enter':
        case 'Tab': {
          this._onManuallyInput();
          break;
        }
        default:
          this.showOptions();
      }
    }
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  select() {
    this.input.select();
  }
}

InputWithOptions.defaultProps = {
  ...Input.defaultProps,
  ...DropdownLayout.defaultProps,
  onSelect: () => {},
  options: [],
  closeOnSelect: true
};

InputWithOptions.propTypes = {
  ...Input.propTypes,
  ...DropdownLayout.propTypes,
  customInput: React.PropTypes.element,
  closeOnSelect: React.PropTypes.bool,
  onManuallyInput: React.PropTypes.func
};

InputWithOptions.displayName = 'InputWithOptions';

export default InputWithOptions;
