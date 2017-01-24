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
    <div className="ltr" style={style}>Focus<br/><InputArea forceFocus/></div>
    <div className="ltr" style={style}>Hover<br/><InputArea forceHover/></div>
    <div className="ltr" style={style}>With placeholder<br/><InputArea placeholder="duyg"/></div>
  </div>;
