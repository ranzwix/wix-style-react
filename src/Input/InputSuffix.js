import React, {PropTypes} from 'react';

import SvgExclamation from '../svg/Exclamation.js';
import {CloseThin, ArrowDownThin, Search4} from '../Icons';
import Tooltip from '../Tooltip';
import styles from './Input.scss';

const InputSuffix = ({
  value,
  error,
  unit,
  magnifyingGlass,
  menuArrow,
  onClear,
  onFocus,
  children,
  disabled,
  errorMessage
}) => {

  const onIconClicked = () => {
    if (!disabled) {
      onFocus();
    }
  };

  const exclamation = error && !disabled ? (
    <div className={styles.exclamation}>
      <Tooltip disabled={errorMessage.length === 0} placement="top" moveBy={{x: 2, y: 0}} alignment="center" content={errorMessage} overlay="" theme="dark">
        <div className={styles.exclamation}><SvgExclamation width={2} height={11}/></div>
      </Tooltip>
    </div>) : null;

  const unitDom = unit ? <div className={styles.unit} onClick={onIconClicked}>{unit}</div> : null;
  const unitSeparatorDom = unitDom ? <div className={styles.unitSeparator}/> : null;

  const clearButtonDom = !!onClear && !error && !disabled && !!value ?
    <div onClick={onClear} className={styles.clearButton}><CloseThin size={'6px'}/></div> : null;

  const magnifyingGlassDom = magnifyingGlass && !clearButtonDom && !error ?
    <div className={styles.magnifyingGlass} disabled={disabled} onClick={onIconClicked}><Search4 size={'18px'}/></div> : null;

  const menuArrowDom = menuArrow && !clearButtonDom && !error && !magnifyingGlass ?
    <div className={styles.menuArrow} disabled={disabled} onClick={onIconClicked}><ArrowDownThin size={'0.5em'}/></div> : null;

  return (
    <div className={styles.suffix}>
      {exclamation}
      {magnifyingGlassDom}
      {clearButtonDom}
      {menuArrowDom}
      {unitSeparatorDom}
      {unitDom}
      {children}

    </div>
  );
};

InputSuffix.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.bool,
  unit: PropTypes.string,
  magnifyingGlass: PropTypes.bool,
  menuArrow: PropTypes.bool,
  rtl: PropTypes.bool,
  onClear: PropTypes.func,
  onFocus: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default InputSuffix;
