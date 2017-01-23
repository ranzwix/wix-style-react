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
    <div className="ltr" style={style}>Left to right<InputArea magnifyingGlass/></div>
    <div className="rtl" style={style}>Right to left<InputArea rtl magnifyingGlass/></div>
    <div className="ltr" style={style}>With unit<InputArea magnifyingGlass unit="$"/></div>
    <div className="ltr" style={style}>With error<InputArea magnifyingGlass error/></div>
    <div className="ltr" style={style}>With unit &amp; error<InputArea magnifyingGlass error unit="$"/></div>
  </div>;
