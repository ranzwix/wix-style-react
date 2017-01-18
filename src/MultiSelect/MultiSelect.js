import React from 'react';
import InputWithOptions from '../InputWithOptions/InputWithOptions';
import InputWithTags from './InputWithTags';
import last from 'lodash.last';
import difference from 'lodash.difference';
import uniqueId from 'lodash.uniqueid';
import remove from 'lodash.remove';

class MultiSelect extends InputWithOptions {

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onManuallyInput = this.onManuallyInput.bind(this);
  }

  getUnselectedOptions() {
    const optionIds = this.props.options.map(option => option.id);
    const tagIds = this.props.tags.map(tag => tag.id);
    const unselectedOptionsIds = difference(optionIds, tagIds);
    return this.props.options.filter(option => unselectedOptionsIds.includes(option.id));
  }

  dropdownAdditionalProps() {
    const unselectedOptions = this.getUnselectedOptions();
    return {
      options: unselectedOptions.filter(this.props.predicate)
    };
  }

  closeOnSelect() {
    return false;
  }

  inputAdditionalProps() {
    return {
      inputElement: <InputWithTags/>,
      onKeyDown: this.onKeyDown
    };
  }

  _onSelect(option) {
    super._onSelect(option);
    this.onSelect(option);
  }

  _onManuallyInput(inputValue) {
    if (inputValue.trim()) {
      super._onManuallyInput(inputValue);
      this.onManuallyInput(inputValue);
    } else {
      super.hideOptions();
    }
    this.clearInput();
  }

  onKeyDown(event) {
    const {tags, value, onRemoveTag} = this.props;
    if (tags.length > 0 && (event.key === 'Delete' || event.key === 'Backspace') && value.length === 0) {
      onRemoveTag(last(tags).id);
    }

    if (event.key === 'Tab' || event.key === 'Escape') {
      this.clearInput();
      super.hideOptions();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  optionToTag({id, value, tag}) {
    return tag ? {id, ...tag} : {id, label: value};
  }

  onSelect(option) {
    this.clearInput();

    if (this.props.onSelect) {
      this.props.onSelect(this.optionToTag(option));
    }

    const updeatedOptions = this.getUnselectedOptions();
    remove(updeatedOptions, option);
    this.setState({unSelectedOptions: updeatedOptions});

    this.input.focus();
  }

  onManuallyInput(inputValue) {
    if (!inputValue) {
      this.input.blur();
      return;
    }

    if (this.props.onManuallyInput) {
      this.props.onManuallyInput(this.optionToTag({id: uniqueId('customOption_'), value: inputValue}));
    }

    this.clearInput();
  }

  clearInput() {
    if (this.props.onChange) {
      this.props.onChange({target: {value: ''}});
    }
    this.setState({inputValue: ''});
  }
}

MultiSelect.propTypes = {
  ...InputWithOptions.propTypes,
  predicate: React.PropTypes.func,
  tags: React.PropTypes.array
};

MultiSelect.defaultProps = {
  ...InputWithOptions.defaultProps,
  predicate: () => true,
  tags: []
};

export default MultiSelect;
