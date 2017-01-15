import React from 'react';
import {Label, Input} from 'wix-style-react';

export default () =>
  <div style={{display: 'flex', alignItems: 'center'}}>
    <Label dataHook="label" for="input-id" appearance="T1.1">
      Label text
    </Label>&nbsp;
    <Input id="input-id"/>
  </div>;
