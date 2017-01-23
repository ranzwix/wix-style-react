import React, {PropTypes} from 'react';

import SvgExclamation from '../svg/Exclamation.js';
import MagnifyingGlass from '../svg/MagnifyingGlass.js';
import SvgX from '../svg/X.js';
import MenuArrow from '../svg/MenuArrow';
import styles from './InputArea.scss';

const InputSuffix = ({
  value,
  error,
  onClear,
  onFocus,
  rtl,
  children
}) => {

  const exclamation = error ? (
    <div className={styles.exclamation}>
      <SvgExclamation width={2} height={11}/>
    </div>) : null;


  return (
    <div className={styles.suffix}>
      {exclamation}
      {children}
    </div>
  );
};

InputSuffix.propTypes = {
  value: PropTypes.string,
  error: PropTypes.bool,
  rtl: PropTypes.bool,
  onClear: PropTypes.func,
  onFocus: PropTypes.func,
  children: PropTypes.node
};

export default InputSuffix;
