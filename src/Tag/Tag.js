import React, {PropTypes} from 'react';
import styles from './Tag.scss';
import classNames from 'classnames';
import WixComponent from '../WixComponent';

class Tag extends WixComponent {
  render() {
    const {id, children, thumb, removable, onRemove, size} = this.props;

    const className = classNames({
      [styles.tag]: true,
      [styles.large]: size === 'large'
    });

    return (
      <span className={className} id={id}>
        {thumb && <span className={styles.thumb}>{thumb}</span>}
        <span>{children}</span>
        {removable && <a className={styles.tagRemoveButton} onClick={() => onRemove(id)}/>}
      </span>
    );
  }
}

Tag.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  thumb: PropTypes.element,
  onRemove: PropTypes.func,
  removable: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large']),
};

Tag.defaultProps = {
  onRemove: () => {},
  size: 'small',
  removable: true,
};

export default Tag;
