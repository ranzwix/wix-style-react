import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Markdown from '../utils/Components/Markdown';
import CodeExample from '../utils/Components/CodeExample';
import Readme from '../../src/Button/README.md';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw!./ExampleStandard';

import ExampleError from './ExampleError';
import ExampleErrorRaw from '!raw!./ExampleError';

import ExamplePremium from './ExamplePremium';
import ExamplePremiumRaw from '!raw!./ExamplePremium';

import ExampleGreen from './ExampleGreen';
import ExampleGreenRaw from '!raw!./ExampleGreen';

import ExampleTransparent from './ExampleTransparent';
import ExampleTransparentRaw from '!raw!./ExampleTransparent';

import ExampleSizes from './ExampleSizes';
import ExampleSizesRaw from '!raw!./ExampleSizes';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw!./ExampleControlled';

import ExampleAnimation from './ExampleAnimation';
import ExampleAnimationRaw from '!raw!./ExampleAnimation';

storiesOf('3. Buttons', module)
  .add('3.1 Standard', () => (
    <div>
      <Markdown source={Readme}/>

      <h1>Usage examples</h1>

      <CodeExample title="Standard" code={ExampleStandardRaw}>
        <ExampleStandard/>
      </CodeExample>

      <CodeExample title="Error" code={ExampleErrorRaw}>
        <ExampleError/>
      </CodeExample>

      <CodeExample title="Premium" code={ExamplePremiumRaw}>
        <ExamplePremium/>
      </CodeExample>

      <CodeExample title="Green" code={ExampleGreenRaw}>
        <ExampleGreen/>
      </CodeExample>

      <CodeExample title="Transparent" code={ExampleTransparentRaw}>
        <ExampleTransparent/>
      </CodeExample>

      <CodeExample title="Sizes" code={ExampleSizesRaw}>
        <ExampleSizes/>
      </CodeExample>

      <CodeExample title="Controlled" code={ExampleControlledRaw}>
        <ExampleControlled/>
      </CodeExample>

      <CodeExample title="Animation" code={ExampleAnimationRaw}>
        <ExampleAnimation/>
      </CodeExample>
    </div>
  ));
