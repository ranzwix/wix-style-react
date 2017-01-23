import React from 'react';
import InputArea from 'wix-style-react/InputArea';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '200px',
  lineHeight: '22px',
  verticalAlign: 'top'
};

const defaultProps = {
  size: 'normal',
  magnifyingGlass: true,
  placeholder: 'They did not know it was impossible, so they did it!',
  unit: '$'
};

export default () =>
  <div className="ltr">
    <div style={style}>
      Small
      <InputArea {...defaultProps} size="small"/><br/>
      <InputArea {...defaultProps} size="small" error/>
    </div>
    <div style={style}>
      Normal<br/>
      <InputArea {...defaultProps} size="normal"/><br/>
      <InputArea {...defaultProps} size="normal" error/>
    </div>
    <div style={style}>
      Large<br/>
      <InputArea {...defaultProps} size="large"/><br/>
      <InputArea {...defaultProps} size="large" error/>
    </div>
  </div>;
