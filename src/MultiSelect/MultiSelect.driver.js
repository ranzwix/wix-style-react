import React from 'react';
import MultiSelect from './MultiSelect';
import inputWithOptionsDriverFactory from '../InputWithOptions/InputWithOptions.driver';
import ReactDOM from 'react-dom';

const multiSelectDriverFactory = ({component, wrapper}) => {

  const {driver, inputDriver, dropdownLayoutDriver} = inputWithOptionsDriverFactory({component, wrapper});

  const multiSelectDriver = Object.assign(driver, {
    exists: () => !!component,
    setProps: props => {
      ReactDOM.render(<div ref={r => component = r}><MultiSelect {...props}/></div>, wrapper);
    }
  });

  return {driver: multiSelectDriver, inputDriver, dropdownLayoutDriver};
};

export default multiSelectDriverFactory;
