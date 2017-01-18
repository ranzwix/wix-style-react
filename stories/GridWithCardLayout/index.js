import React from 'react';
import {storiesOf} from '@kadira/storybook';
import CodeExample from '../utils/Components/CodeExample';
import ExampleGrid from './ExampleGrid';

import ExampleGridRaw from '!raw!./ExampleGrid';

storiesOf('4. Layouts', module)
  .add('4.5 Grid with card layout', () => (
    <div>
      <h1>Grid with card layout</h1>
      <CodeExample title="Grid with card layout" code={ExampleGridRaw}>
        <ExampleGrid/>
      </CodeExample>
    </div>
  ));
