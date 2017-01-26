import React from 'react';
import Button from 'wix-style-react/Button';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '140px',
  lineHeight: '22px'
};

export default () =>
  <div style={{backgroundColor:'#F0F4F7', padding:'20px 0px'}}>
    <div style={style}>Main<br/><Button theme="fullblue">Click Me!</Button></div>
    <div style={style}>Secondary<br/><Button theme="emptyblue">Click Me!</Button></div>
    <div style={style}>Secondary 2 (emptybluesecondary)<br/><Button theme="emptybluesecondary">Click Me!</Button></div>
    <div style={style}>Main - Disabled<br/><Button theme="fullblue" disabled={true}>Click Me!</Button></div>
      <div style={style}>Secondary - Disabled<br/><Button theme="emptyblue" disabled={true}>Click Me!</Button></div>
    <div style={style}>Secondary 2 - Disabled <br/><Button theme="emptybluesecondary" disabled={true}>Click Me!</Button></div>
  </div>;
