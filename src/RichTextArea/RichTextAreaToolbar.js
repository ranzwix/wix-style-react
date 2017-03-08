import React, {PropTypes} from 'react';
import classNames from 'classnames';
import WixComponent from '../WixComponent';
import RichTextAreaButton from './RichTextAreaButton';
import RichTextAreaLinkButton from './RichTextAreaLinkButton';
import styles from './RichTextAreaToolbar.scss';

class RichTextAreaToolbar extends WixComponent {
  render() {
    return (
      <div className={styles.container}>
        {this.renderButton('mark', 'bold')}
        {this.renderButton('mark', 'italic')}
        {this.renderButton('mark', 'underline')}
        {this.renderLinkButton()}
        {this.renderButton('block', 'unordered-list')}
        {this.renderButton('block', 'ordered-list')}
        {this.renderButton('block', 'image')}
      </div>
    );
  }

  renderButton(action, type) {
    const {onClick, hasMark, hasListBlock, disabled} = this.props;
    const isActive = (action === 'mark') ? hasMark : hasListBlock;

    return (
      <div className={classNames(styles.button, {[styles.disabled]: disabled})}>
        <RichTextAreaButton
          disabled={disabled}
          onClick={() => onClick(action, type)}
          type={type}
          isActive={isActive(type)}
          />
      </div>
    );
  }

  renderLinkButton() {
    const {onLinkButtonClick, hasLink, disabled, isSelectionExpanded} = this.props;

    return (
      <div className={classNames(styles.button, {[styles.disabled]: disabled})}>
        <RichTextAreaLinkButton
          disabled={disabled}
          onClick={onLinkButtonClick}
          type="link"
          isActive={hasLink()}
          isSelectionExpanded={!isSelectionExpanded}
          />
      </div>
    );
  }
}

RichTextAreaToolbar.propTypes = {
  onClick: PropTypes.func,
  onLinkButtonClick: PropTypes.func,
  hasMark: PropTypes.func.isRequired,
  hasListBlock: PropTypes.func.isRequired,
  hasLink: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isSelectionExpanded: PropTypes.bool,
};

export default RichTextAreaToolbar;
