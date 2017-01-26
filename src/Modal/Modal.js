import React from 'react';
import ReactModal from 'react-modal';
import styles from './Modal.scss';
import {colors, positions} from './ModalConstants';

const Modal = props => {
  //TODO When deprecation ends, _theme won't be needed.
  const _theme = props.theme || props.style;

  if (props.style) {
    console.warn('[wix-style-react>Modal] Warning. Property \'style\' has been deprecated, and will be removed Jan 1st 2017. Please use \'theme\' instead.');
  }

  const justifyContent = positions[props.horizontalPosition];
  const alignItems = positions[props.verticalPosition];

  const modalStyles = {
    overlay: {
      // Overriding defaults
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 11 + (props.zIndex || 0),
      backgroundColor: null, // null disables the property, use css instead
      // Overriding defaults - END
      display: 'flex',
      justifyContent,
      alignItems,
      overflowY: 'auto'
    },
    content: {
      // Overriding defaults
      position: 'fixed',
      top: '50%',
      left: '50%',
      right: 'initial',
      bottom: 'initial',
      transform: null,
      border: 'none',
      overflow: 'initial',
      WebkitOverflowScrolling: 'touch',
      outline: 'none',
      borderRadius: '0px',
      padding: '0px',
      boxShadow: '0 0 14px 0 rgba(22, 45, 60, 0.3)',
      // Overriding defaults - END
      backgroundColor: 'transparent',
      marginBottom: '0px'
    }
  };

  const modalClasses = `${styles.modal} ${styles[_theme]}`;

  return (
    <ReactModal
      isOpen={props.isOpen}
      shouldCloseOnOverlayClick={props.shouldCloseOnOverlayClick}
      onRequestClose={props.onRequestClose}
      onAfterOpen={props.onAfterOpen}
      style={modalStyles}
      className={modalClasses}
      contentLabel={props.contentLabel}
      closeTimeoutMS={500}
      >
      {props.children}
    </ReactModal>
  );
};

Modal.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  contentLabel: React.PropTypes.string.isRequired,
  onCancel: React.PropTypes.func,
  style: React.PropTypes.oneOf(Object.keys(colors)),
  theme: React.PropTypes.oneOf(Object.keys(colors)),
  children: React.PropTypes.any,
  zIndex: React.PropTypes.number,
  shouldCloseOnOverlayClick: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,
  onAfterOpen: React.PropTypes.func,
  horizontalPosition: React.PropTypes.oneOf(Object.keys(positions)),
  verticalPosition: React.PropTypes.oneOf(Object.keys(positions))
};

Modal.defaultProps = {
  onOk: () => { },
  theme: colors.blue,
  shouldCloseOnOverlayClick: false,
  horizontalPosition: 'center',
  verticalPosition: 'start',
};

export default Modal;
