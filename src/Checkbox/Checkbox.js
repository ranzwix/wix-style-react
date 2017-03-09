import styles from './Checkbox.scss';
import uniqueId from 'lodash.uniqueid';
import React from 'react';
import classNames from 'classnames';
import SvgV from '../svg/V';
import WixComponent from '../WixComponent';
import Label from '../Label/Label';

class Checkbox extends WixComponent {
  render() {
    const {id = uniqueId(), checked, indeterminate, disabled, hover, active, onChange} = this.props;

    const classname = classNames({
      [styles.wrapper]: true,
      [styles.checked]: checked,
      [styles.unchecked]: !checked,
      [styles.hover]: hover,
      [styles.active]: active,
      [styles.disabled]: disabled
    });

    const checkedSymbol = indeterminate ? <div className={styles.indeterminate}/> : <SvgV/>;

    return (
      <div className={classname} >
        <input type="checkbox" id={id} checked={checked} disabled={disabled} onChange={disabled ? null : onChange}/>
        <Label for={id} appearance="T3.1">
          <div className={styles.checkbox}>
            <div className={styles.inner}>
              {checkedSymbol}
            </div>
          </div>
          <div className={styles.children}>{this.props.children}</div>
        </Label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  hover: React.PropTypes.bool,        // FOR AUTOMATIC TESTING
  active: React.PropTypes.bool,       // FOR AUTOMATIC TESTING
  children: React.PropTypes.any,
  id: React.PropTypes.string,
  indeterminate: React.PropTypes.bool
};

Checkbox.defaultProps = {
  onChange: () => { }
};

export default Checkbox;
