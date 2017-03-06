import React from 'react';
import {storiesOf} from '@kadira/storybook';
import InteractiveCodeExample from '../utils/Components/InteractiveCodeExample';
import Markdown from '../utils/Components/Markdown';

import ReadMe from '../../src/RichTextArea/README.md';
import RichTextAreaExample from './RichTextAreaExample';

storiesOf('Core', module)
  .add('RichTextArea', () => (
    <div>
      <Markdown source={ReadMe}/>
      <InteractiveCodeExample title="Customize a <RichTextArea/>">
        <RichTextAreaExample />
      </InteractiveCodeExample>
    </div>
  ));
