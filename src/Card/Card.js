import React, {Component} from 'react';
import styles from './Card.scss';
import classNames from 'classnames';
import TextLink from '../TextLink';

export default class Card extends Component {

  static propTypes = {
    title: React.PropTypes.string,
    link: React.PropTypes.shape({
      link: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired
    }),
    subtitle: React.PropTypes.string,
    withoutDivider: React.PropTypes.bool,
    children: React.PropTypes.node
  };

  static defaultProps = {
    title: null,
    link: null,
    subtitle: null,
    withoutDivider: false
  };

  render() {
    const {title, subtitle, withoutDivider, link} = this.props;
    let header = null;
    if (title || subtitle) {
      const headerClasses = classNames({
        [styles.header]: true,
        [styles.withDivider]: !withoutDivider,
      });

      const linkElement = link ? (
        <TextLink link={link.link}>{link.title}</TextLink>
        ) : null;

      const titleElement = title ? (
        <div className={styles.title}>
          {title}
          {linkElement}
        </div>
        ) : null;

      const subtitleElement = subtitle ? (
        <div className={styles.subtitle}>
          {this.props.subtitle}
        </div>
        ) : null;

      header = (
        <div className={headerClasses}>
          {titleElement}
          {subtitleElement}
        </div>
      );
    }

    return (
      <div className={styles.card}>
        {header}
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
