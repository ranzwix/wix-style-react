import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames';
import WixComponent from '../WixComponent';

class Button extends WixComponent {
  render() {
    const {theme, hover, active, disabled, height, onClick, children} = this.props;

    const className = classNames({
      [styles.button]: true,
      [styles[theme]]: true,
      [styles.hover]: hover,
      [styles.active]: active,
      [styles.disabled]: disabled,
      [styles[`height${height}`]]: height !== 'medium'
    });

    const _style = {
      height
    };

    return (
      <button className={className} onClick={onClick} style={_style}>
        <div className={styles.inner}>
          {children}
        </div>
      </button>
    );
  }
}

Button.defaultProps = {
  theme: 'fullblue',
  height: 'medium'
};

Button.propTypes = {
  id: React.PropTypes.string,
  theme: React.PropTypes.oneOf(['fullblue', 'emptyblue', 'emptybluesecondary', 'fullpurple', 'emptypurple', 'fullgreen', 'emptygreen', 'fullred', 'emptyred', 'transparent']),
  height: React.PropTypes.oneOf(['small', 'medium', 'large']),
  hover: React.PropTypes.bool,
  active: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  children: React.PropTypes.any
};

Button.displayName = 'Button';

export default Button;
