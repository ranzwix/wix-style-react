import React, {PropTypes} from 'react';
import s from './Icon.scss';

const Icon = ({children, viewBox, size}) => {

  return (
    <svg
      className={s.iconDefault}
      width={size}
      height={size}
      viewBox={viewBox}
      >
      {children}
    </svg>
  );
};

Icon.defaultProps = {
  size: '1em'
};

Icon.propTypes = {
  size: PropTypes.string,
  children: PropTypes.any,
  viewBox: PropTypes.string.isRequired
};

export default Icon;
