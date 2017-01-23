import React, {PropTypes} from 'react';

import SvgExclamation from '../svg/Exclamation.js';
import MagnifyingGlass from '../svg/MagnifyingGlass.js';
import SvgX from '../svg/X.js';
import MenuArrow from '../svg/MenuArrow';

import styles from './Input.scss';

const InputSuffix = ({
  value,
  error,
  unit,
  magnifyingGlass,
  menuArrow,
  onClear,
  onFocus,
  rtl,
  children
}) => {

  const exclamation = error ? (
    <div className={styles.exclamation}>
      <SvgExclamation width={2} height={11}/>
    </div>) : null;

  const unitDom = unit ? <div className={styles.unit} onClick={onFocus}>{unit}</div> : null;
  const unitSeparatorDom = unitDom ? <div className={styles.unitSeparator}/> : null;

  const clearButtonDom = !!onClear && !error && !!value ?
    <div onClick={onClear} className={styles.clearButton}><SvgX width={6} height={6} thickness={1}/></div> : null;

  const magnifyingGlassDom = magnifyingGlass && !clearButtonDom && !error ?
    <div className={styles.magnifyingGlass} onClick={onFocus}><MagnifyingGlass alignLeft={!rtl}/></div> : null;

  const menuArrowDom = menuArrow && !clearButtonDom && !error && !magnifyingGlass ?
    <div className={styles.menuArrow} onClick={onFocus}><MenuArrow/></div> : null;

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
  children: PropTypes.node
};

export default InputSuffix;
