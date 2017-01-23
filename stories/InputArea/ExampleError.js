import React from 'react';
import InputArea from 'wix-style-react/InputArea';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '200px',
  lineHeight: '22px'
};

export default () =>
  <div>
    <div className="ltr" style={style}>Left to right<InputArea error/></div>
    <div className="rtl" style={style}>Right to left<InputArea rtl error/></div>
  </div>;
