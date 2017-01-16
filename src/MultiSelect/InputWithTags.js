import React from 'react';
import Tag from '../Tag/Tag';
import styles from './InputWithTags.scss';
import omit from 'lodash.omit';

class InputWithTags extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.select = this.select.bind(this);
  }

  render() {
    const {tags, onRemoveTag, placeholder, ...inputProps} = this.props;
    const desiredProps = omit(inputProps, ['theme', 'onManuallyInput', 'inputElement', 'closeOnSelect', 'predicate', 'menuArrow']);
    return (
      <div className={styles.tagsContainer} onClick={() => this.input.focus()}>

        {tags.map(tag => <Tag key={tag.id} onRemove={onRemoveTag} {...tag}/>)}

        <input
          className={styles.inputField}
          ref={input => this.input = input}
          placeholder={tags.length === 0 ? placeholder : ''}
          {...desiredProps}
          />
      </div>
    );
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

InputWithTags.propTypes = {
  onRemoveTag: React.PropTypes.func,
  tags: React.PropTypes.array,
  onKeyDown: React.PropTypes.func,
  placeholder: React.PropTypes.string
};

InputWithTags.defaultProps = {
  onRemoveTag: () => {},
  tags: [],
  placeholder: ''
};

export default InputWithTags;
