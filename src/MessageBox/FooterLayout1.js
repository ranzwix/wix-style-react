import React from 'react';
import Button from '../Button';
import * as styles from './FooterLayout.scss';

const FooterLayout1 = ({children, style, theme, cancelText, onCancel, onOk, confirmText}) => {
  //TODO When deprecation ends, _theme won't be needed.
  let _theme;
  if (style) {
    console.warn('[wix-style-react>FooterLayout1] Warning. Property \'style\' has been deprecated, and will be removed Jan 1st 2017. Please use \'theme\' instead.');
    _theme = style;
  } else {
    _theme = theme;
  }

  return (
    <div className={styles.footer} >
      {children}
      <div className={styles.footerbuttons}>
        {cancelText ?
          <Button height="small" theme={'empty' + _theme} onClick={onCancel} >
            {cancelText}
          </Button> : null
        }
        <Button height="small" theme={'full' + _theme} onClick={onOk} >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

FooterLayout1.propTypes = {
  confirmText: React.PropTypes.string,
  cancelText: React.PropTypes.string,
  onCancel: React.PropTypes.func,
  onOk: React.PropTypes.func,
  style: React.PropTypes.string,
  theme: React.PropTypes.string,
  children: React.PropTypes.any
};

FooterLayout1.defaultProps = {
  theme: 'blue'
};

export default FooterLayout1;
