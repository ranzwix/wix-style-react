import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/DatePicker/README.md';
import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw!./ExampleControlled';
import ExampleControlledRtl from './ExampleControlledRtl';
import ExampleControlledRawRtl from '!raw!./ExampleControlledRtl';
import ExampleControlledExcludePast from './ExampleControlledExcludePast';
import ExampleControlledRawExcludePast from '!raw!./ExampleControlledExcludePast';

storiesOf('1. Inputs', module)
  .add('1.5 DatePicker', () => (
    <div>
      <Markdown source={Readme}/>

      <h1>Usage examples</h1>

      <CodeExample title="Controlled input" code={ExampleControlledRaw}>
        <ExampleControlled/>
      </CodeExample>

      <CodeExample title="Controlled input - RTL" code={ExampleControlledRawRtl}>
          <ExampleControlledRtl/>
      </CodeExample>

      <CodeExample title="Controlled input - exclude past dates" code={ExampleControlledRawExcludePast}>
        <ExampleControlledExcludePast/>
      </CodeExample>
    </div>
  ));
