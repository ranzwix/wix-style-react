import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import {textAreaTestkitFactory, componentFactory, textAreaDriverFactory} from './testkit/TextArea';
import InputArea from '../InputArea';
import _ from 'lodash/fp';
import Label from '../Label';
import TextArea from '../TextArea';

describe('TextArea', () => {

  const createDriver = _.compose(textAreaDriverFactory, componentFactory);

  it('should remove label wrapping when label not given', () => {
    const driver = createDriver({appearance: 'T1', children: <div><InputArea/></div>});
    expect(driver.getNumberOfChildren()).toBe(1);
  });

  it('should render children', () => {
    const driver = createDriver({appearance: 'T1', children: (<div><Label appearance="T1"/><InputArea/></div>)});

    expect(driver.getLabel().tagName.toLowerCase()).toBe('label');
    expect(driver.getInputArea().tagName.toLowerCase()).toBe('textarea');
  });
});

describe('testkit', () => {
  it('should create new driver', () => {
    const div = document.createElement('div');
    const dataHook = 'compHook';

    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div>
      <TextArea dataHook={dataHook} appearance="T1">
        <InputArea/>
      </TextArea>
    </div>));

    const driver = textAreaTestkitFactory({wrapper, dataHook});
    expect(driver.getAttr('data-hook')).toBe(dataHook);
  });
});
