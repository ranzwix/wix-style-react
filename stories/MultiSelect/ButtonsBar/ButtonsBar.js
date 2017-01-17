import React from 'react';
import styles from './ButtonsBar.scss';

class ButtonsBar extends React.Component {
  static propTypes = {
    onDone: React.PropTypes.func,
    onCancel: React.PropTypes.func,
  };

  static defaultProps = {
    onDone: () => console.log('Done'),
    onCancel: () => console.log('Cancel')
  };

  render() {
    const {onCancel, onDone} = this.props;
    return (
      <div className={styles.buttonsContainer}>
        <button className={styles.cancelButton} onClick={onCancel}>Cancel</button>
        <button className={styles.doneButton} onClick={onDone}>Done</button>
      </div>
    );
  }
}

export default ButtonsBar;
