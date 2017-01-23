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
    <div className="ltr" style={style}>InputArea<br/><InputArea/></div>
    <div className="ltr" style={style}>Focus<InputArea forceFocus/></div>
    <div className="ltr" style={style}>Hover<InputArea forceHover/></div>
    <div className="ltr" style={style}>With placeholder<InputArea placeholder="Search..."/></div>
  </div>;
