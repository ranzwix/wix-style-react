import React from 'react';
import Input from 'wix-style-react/Input';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '200px',
  lineHeight: '22px'
};

export default () =>
  <div>
    <div className="ltr" style={style}>Left to right<Input error/></div>
    <div className="rtl" style={style}>Right to left<Input rtl error/></div>
    <div className="ltr" style={style}>Error with tooltip<Input error errorMessage='I am a message'/></div>
  </div>;
