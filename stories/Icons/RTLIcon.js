import React from 'react';
import {Duplicate2} from '../../src/Icons';
import s from './style.scss';

export default () => {
  return (
    <div className="rtl">
      <div className={s.iconList}>
        <div className={s.singleIconView}>
          <span><Duplicate2 size="3em"/></span>
          <span className={s.iconName}>Duplicate2 (size x 3, rtl)</span>
        </div>
      </div>
    </div>
  );
};
