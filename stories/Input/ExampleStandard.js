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
    <div className="ltr" style={style}>Input<br/><Input/></div>
    <div className="ltr" style={style}>Focus<Input forceFocus/></div>
    <div className="ltr" style={style}>Hover<Input forceHover/></div>
    <div className="ltr" style={style}>With placeholder<Input placeholder="Search..."/></div>
    <div className="ltr" style={style}>Disabled<br/><Input disabled placeholder="disabled"/></div>
    <div className="ltr" style={style}>Disabled with search<br/><Input magnifyingGlass disabled placeholder="disabled with search"/></div>
  </div>;
