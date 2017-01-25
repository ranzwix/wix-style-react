import React from 'react';

import SvgExclamation from '../svg/Exclamation.js';
import styles from './InputArea.scss';

const exclamation = () =>
  <div className={styles.suffix + ' ' + styles.exclamation}>
    <SvgExclamation width={2} height={11}/>
  </div>;

export default exclamation;
