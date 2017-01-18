import React from 'react';
import styles from './Breadcrumbs.scss';
import classNames from 'classnames';
import {Label} from 'wix-style-react';
import WixComponent from '../WixComponent';

class Breadcrumbs extends WixComponent {
  render() {
    const {items, onClick, size, theme, activeId} = this.props;

    const className = classNames({
      [styles[size]]: true,
      [styles[theme]]: true,
      [styles.breadcrumbs]: true
    });

    let labelAppearance;
    const getLabelAppearance = (size, theme, isActive) => {
      const isDarkBackground = theme === 'onDarkBackground';
      const isMediumSize = size === 'medium';
      if (isActive && !isDarkBackground) {
        return isMediumSize ? 'T3' : 'T1';
      }
      if (isMediumSize) {
        return isDarkBackground ? 'T3.2' : 'T3.1';
      } else {
        return isDarkBackground ? 'T1.2' : 'T1.1';
      }
    };

    return (
      <div className={className}>
        <ul data-hook="breadcrumbs-items">
          {items.map(item => {
            const isActive = activeId === item.id;
            const itemClassName = classNames({
              [styles.active]: isActive,
              [styles.item]: true
            });
            labelAppearance = getLabelAppearance(size, theme, isActive);
            return (
              <li key={item.id} onClick={() => onClick(item.id)} className={itemClassName}>
                <div className={styles.label}>
                  <Label appearance={labelAppearance}>{item.value}</Label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

Breadcrumbs.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]).isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.string
    ]).isRequired
  })).isRequired,
  onClick: React.PropTypes.func,
  activeId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  size: React.PropTypes.oneOf(['medium', 'large']),
  theme: React.PropTypes.oneOf(['onWhiteBackground', 'onGrayBackground', 'onDarkBackground']),
};

Breadcrumbs.defaultProps = {
  size: 'medium',
  theme: 'onGrayBackground'
};

export default Breadcrumbs;
