import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/InputArea/README.md';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw!./ExampleStandard';

import ExampleError from './ExampleError';
import ExampleErrorRaw from '!raw!./ExampleError';

import ExampleUnit from './ExampleUnit';
import ExampleUnitRaw from '!raw!./ExampleUnit';

import ExampleMagnifyingGlass from './ExampleMagnifyingGlass';
import ExampleMagnifyingGlassRaw from '!raw!./ExampleMagnifyingGlass';

import ExamplePaneltitleStyle from './ExamplePaneltitleStyle';
import ExamplePaneltitleStyleRaw from '!raw!./ExamplePaneltitleStyle';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw!./ExampleControlled';

import ExampleRefs from './ExampleRefs';
import ExampleRefsRaw from '!raw!./ExampleRefs';

import ExampleSizes from './ExampleSizes';
import ExampleSizesRaw from '!raw!./ExampleSizes';

storiesOf('1. Inputs', module)
  .add('1.3 MultiLine', () => (
    <div>
      <Markdown source={Readme}/>

      <h1>Usage examples</h1>

      <CodeExample title="Standard" code={ExampleStandardRaw}>
        <ExampleStandard/>
      </CodeExample>

      <CodeExample title="Error" code={ExampleErrorRaw}>
        <ExampleError/>
      </CodeExample>

      <CodeExample title="Unit" code={ExampleUnitRaw}>
        <ExampleUnit/>
      </CodeExample>

      <CodeExample title="MagnifyingGlass" code={ExampleMagnifyingGlassRaw}>
        <ExampleMagnifyingGlass/>
      </CodeExample>

      <CodeExample title="PaneltitleStyle" code={ExamplePaneltitleStyleRaw}>
        <ExamplePaneltitleStyle/>
      </CodeExample>

      <CodeExample title="Controlled input" code={ExampleControlledRaw}>
        <ExampleControlled/>
      </CodeExample>

      <CodeExample title="Sizes" code={ExampleSizesRaw}>
        <ExampleSizes/>
      </CodeExample>

      <CodeExample title="Commands test" code={ExampleRefsRaw}>
        <ExampleRefs/>
      </CodeExample>

    </div>
  ));
