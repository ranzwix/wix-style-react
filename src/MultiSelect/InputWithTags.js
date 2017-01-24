import React, {PropTypes} from 'react';
import Tag from '../Tag/Tag';
import Input from '../Input/Input';
import styles from './InputWithTags.scss';
import omit from 'lodash.omit';

class InputWithTags extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.blur = this.blur.bind(this);
    this.select = this.select.bind(this);
  }

  componentDidMount() {
    this.props.autoFocus && this.props.onFocus();
  }

  render() {
    const {tags, onRemoveTag, placeholder, ...inputProps} = this.props;
    const desiredProps = omit(inputProps, ['onManuallyInput', 'inputElement', 'closeOnSelect', 'predicate', 'menuArrow', 'onClickOutside', 'fixedHeader', 'fixedFooter', 'dataHook']);
    return (
      <div className={styles.tagsContainer} onClick={() => this.input.focus()}>

        {tags.map(({label, ...rest}) => <Tag key={rest.id} onRemove={onRemoveTag} {...rest}>{label}</Tag>)}

        <Input
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
  onRemoveTag: PropTypes.func,
  tags: PropTypes.array,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  autoFocus: PropTypes.bool
};

InputWithTags.defaultProps = {
  onRemoveTag: () => {},
  tags: [],
  placeholder: ''
};

export default InputWithTags;
