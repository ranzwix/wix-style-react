import React, {PropTypes} from 'react';

import SvgExclamation from '../svg/Exclamation.js';
import styles from './InputArea.scss';

const InputSuffix = ({
  error,
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
  error: PropTypes.bool,
  children: PropTypes.node
};

export default InputSuffix;
