import React from 'react';
import {storiesOf} from '@kadira/storybook';
import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample';
import Markdown from '../utils/Components/Markdown';

import Readme from '../../src/TextArea/README.md';
import ExampleStandard from './ExampleStandard';

storiesOf('6. Common', module)
  .add('6.4 TextArea', () => {
    return (
      <div>
        <Markdown source={Readme}/>
        <InteractiveCodeExample title="Customize a <TextArea/>">
          <ExampleStandard/>
        </InteractiveCodeExample>
      </div>
    );
  });
