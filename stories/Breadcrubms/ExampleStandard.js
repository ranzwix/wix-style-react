import React from 'react';
import styles from './ExampleBreadcrumbs.scss';
import Breadcrumbs from '../../src/Breadcrumbs/Breadcrumbs';

const items = [{id: '1', value: 'first item'}, {id: '2', value: 'second item'}, {id: '3', value: 'third item'}];
const itemsWithLinks = [{id: '1', value: 'Wix', link: 'http://www.wix.com'}, {id: '2', value: 'Google', link: 'http://www.google.com'}, {id: '3', value: 'Yahoo', link: 'http://www.yahoo.com'}];

export default () =>
  <div>
    <div className={`${styles.onGrayBackground} ${styles.exampleWrapper}`}>Without links
      <Breadcrumbs
        items={items}/>
    </div>
    <div className={`${styles.onGrayBackground} ${styles.exampleWrapper}`}>With links
      <Breadcrumbs
        items={itemsWithLinks}/>
    </div>
    <div className={`${styles.onGrayBackground} ${styles.exampleWrapper} rtl`}>RTL
      <Breadcrumbs
        items={items}/>
    </div>
  </div>;
