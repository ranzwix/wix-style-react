import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import MultiSelect from './MultiSelect';
import inputWithOptionsDriverFactory from '../InputWithOptions/InputWithOptions.driver';
import ReactDOM from 'react-dom';
import initial from 'lodash.initial';

const multiSelectDriverFactory = ({component, wrapper}) => {

  const {driver, inputDriver, dropdownLayoutDriver} = inputWithOptionsDriverFactory({component, wrapper});

  const inputWrapper = driver.inputWrapper().childNodes[0];
  const tags = initial(inputWrapper.childNodes);

  const multiSelectDriver = Object.assign(driver, {
    clickOnInputWrapper: () => ReactTestUtils.Simulate.click(inputWrapper),
    numberOfTags: () => tags.length,
    getTagLabelAt: index => tags[index].textContent,
    setProps: props => {
      ReactDOM.render(<div ref={r => component = r}><MultiSelect {...props}/></div>, wrapper);
    }
  });

  return {driver: multiSelectDriver, inputDriver, dropdownLayoutDriver};
};

export default multiSelectDriverFactory;
