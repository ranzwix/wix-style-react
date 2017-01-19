import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';

import styles from './TooltipContent.scss';

class TooltipContent extends Component {

  static propTypes = {

    /**
     * Tooltip content to be rendered
     */
    children: PropTypes.node.isRequired,

    /**
     * Specifies tooltip theme
     */
    theme: PropTypes.oneOf(['light', 'dark', 'error']).isRequired,

    /**
     * Specifies on which side the arrow should be shown
     */
    arrowPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,

    /**
     * Custom CSS style object (used to allow setting arrow position)
     */
    arrowStyle: PropTypes.object,

    /**
     * Custom CSS style object (used to allow setting the position)
     */
    style: PropTypes.object,

    /**
     * Callback triggered when mouse enters the component
     * Used for showing tooltip when mouse leaves the target element, but hovers the tooltip itself
     */
    onMouseEnter: PropTypes.func,

    /**
     * Callback triggered when mouse leaves the component
     * Used for showing tooltip when mouse leaves the target element, but hovers the tooltip itself
     */
    onMouseLeave: PropTypes.func,

    /**
     * Specifies if tooltip content should use bouncing animation.
     */
    bounce: PropTypes.bool
  }

  static defaultProps = {
    theme: 'light',
    arrowPlacement: 'bottom'
  }

  render() {

    const {
      children,
      theme,
      arrowPlacement,
      arrowStyle,
      style,
      onMouseEnter,
      onMouseLeave,
      bounce
    } = this.props;

    const classNames = [
      styles.tooltip,
      styles[theme],
      styles[`flyin-on-${arrowPlacement}`], {
        [styles[`bounce-on-${arrowPlacement}`]]: bounce
      }
    ];

    return (
      <div
        className={classnames(classNames)}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        >
        <div>{children}</div>
        <div
          className={classnames(styles.arrow, styles[arrowPlacement])}
          style={arrowStyle}
          />
      </div>
    );
  }

}

export default TooltipContent;
