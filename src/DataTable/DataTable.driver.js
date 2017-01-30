import React from 'react';
import ReactDOM from 'react-dom';
import DataTable from './DataTable';
import ReactTestUtils from 'react-addons-test-utils';

const dataTableDriverFactory = ({component, wrapper}) => {

  const getHeader = () => component.querySelector('thead');
  const hasHeader = () => !!getHeader();

  const getRows = () => component.querySelectorAll('tbody tr');
  const getRowsCount = () => getRows().length;
  const getRow = rowIndex => getRows()[rowIndex];


  return {
    getRowsCount,
    getRowsWithClassCount: className => Object.values(getRows()).filter(elem => elem.classList.contains(className)).length,
    getRowText: index => Object.values(getRows()[index].querySelectorAll('td')).map(td => td.textContent),
    isRowClickable: index => getRows()[index].classList.contains('clickableDataRow'),
    getTitles: () => Object.values(getHeader().querySelectorAll('th')).map(th => th.textContent),
    isDisplayingNothing: () => !!component,
    isDisplayingHeaderOnly: () => hasHeader() && getRowsCount() === 0,
    hasChildWithId: id => !!component.querySelector(`#${id}`),
    clickRow: (index, eventData) => ReactTestUtils.Simulate.click(getRow(index), eventData),
    setProps: props => {
      ReactDOM.render(<div ref={r => component = r}><DataTable {...props}/></div>, wrapper);
    }
  };
};

export default dataTableDriverFactory;
