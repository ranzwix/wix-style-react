import React, {Children} from 'react';
import {first, last} from 'lodash/fp';

import {children, optional, once} from '../Composite';
import Label from '../Label';
import Input from '../InputArea';

import styles from './TextArea.scss';

export default function TextArea(props) {
  const children = Children.toArray(props.children);
  return (
    <div data-hook={props.dataHook}>
      { children.length === 2 ?
        <div className={styles.textFieldLabel}>
          {first(children)}
        </div> : null
      }
      { last(children) }
    </div>
  );
}

TextArea.displayName = 'TextArea';

TextArea.propTypes = {
  dataHook: React.PropTypes.string,
  children: children(optional(Label), once(Input))
};
