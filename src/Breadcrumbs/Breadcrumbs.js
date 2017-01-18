import React from 'react';
import styles from './Breadcrumbs.scss';
import classNames from 'classnames';
import {Label} from 'wix-style-react';
import WixComponent from '../WixComponent';
import BreadcrumbsPathFactory from './BreadcrumbsPathFactory';

class Breadcrumbs extends WixComponent {

  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  getLabelAppearance(isActive) {
    const {theme, size} = this.props;

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
  }

  getValue(item) {
    if (!item.link) {
      return item.value;
    } else {
      return <a href={`${item.link}`} style={{color: 'inherit', textDecoration: 'inherit'}}>{item.value}</a>;
    }
  }

  renderItem(item) {
    const {activeId} = this.props;

    const isActive = activeId === item.id;
    const itemClassName = classNames({
      [styles.active]: isActive,
      [styles.item]: true
    });
    const labelAppearance = this.getLabelAppearance(isActive);
    return (
      <li key={item.id} onClick={() => this._onClick(item)} className={itemClassName}>
        <div className={styles.label}>
          <Label appearance={labelAppearance}>{this.getValue(item)}</Label>
        </div>
      </li>
    );
  }

  _onClick(item) {
    this.props.onClick && this.props.onClick(item);
  }

  render() {
    const {items, size, theme, activeId} = this.props;

    const className = classNames({
      [styles[size]]: true,
      [styles[theme]]: true,
    });

    return (
      <div className={className}>
        <ul data-hook="breadcrumbs-items">
          {
            items.map(item => this.renderItem(item, activeId))
          }
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
    ]).isRequired,
    link: React.PropTypes.string
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
  theme: 'onGrayBackground',
};

export const breadcrumbsPathFactory = BreadcrumbsPathFactory;
export default Breadcrumbs;

