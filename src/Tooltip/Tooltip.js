import React, {PropTypes, Component, cloneElement} from 'react';
import ReactDOM from 'react-dom';

import TooltipContent from './TooltipContent';
import position from './TooltipPosition';

class Tooltip extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    content: PropTypes.node.isRequired,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    alignment: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']).isRequired,
    theme: PropTypes.oneOf(['light', 'dark', 'error']).isRequired,
    showDelay: PropTypes.number.isRequired,
    hideDelay: PropTypes.number.isRequired,
    showTrigger: PropTypes.oneOf(['custom', 'mouseenter', 'mouseleave', 'click', 'focus', 'blur']).isRequired,
    hideTrigger: PropTypes.oneOf(['custom', 'mouseenter', 'mouseleave', 'click', 'focus', 'blur']).isRequired,
    active: PropTypes.bool,
    onActiveChange: PropTypes.func.isRequired,
    bounce: PropTypes.bool,
    disabled: PropTypes.bool,

    /**
     * Allows to shift the tooltip position by x and y pixels.
     * Both positive and negative values are accepted.
     */
    moveBy: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),

    /**
     * Allows to position the arrow relative to tooltip.
     * Positive value calculates position from left/top.
     * Negative one calculates position from right/bottom.
     */
    moveArrowTo: PropTypes.number
  }

  static defaultProps = {
    placement: 'top',
    alignment: 'center',
    showTrigger: 'mouseenter',
    hideTrigger: 'mouseleave',
    showDelay: 200,
    hideDelay: 500,
    active: false,
    onActiveChange: () => {},
    theme: 'light',
    disabled: false
  }

  _childNode = null;
  _tooltipNode = null;
  _mountNode = null;
  _showTimeout = null;
  _hideTimeout = null;
  _unmounted = false;

  state = {
    visible: false,
    style: {},
    arrowStyle: {}
  }

  componentDidUpdate() {
    if (this._mountNode && this.state.visible) {
      const arrowPlacement = {top: 'bottom', left: 'right', right: 'left', bottom: 'top'};
      const tooltip = (
        <TooltipContent
          onMouseEnter={() => this.show()}
          onMouseLeave={() => this._onMouseLeave()}
          ref={ref => this._tooltipNode = ReactDOM.findDOMNode(ref)}
          theme={this.props.theme}
          bounce={this.props.bounce}
          arrowPlacement={arrowPlacement[this.props.placement]}
          style={this.state.style}
          arrowStyle={this.state.arrowStyle}
          >{this.props.content}</TooltipContent>
      );
      ReactDOM.render(tooltip, this._mountNode);
    }
    this._updatePosition();
  }

  componentWillUnmount() {
    this._unmounted = true;
    this.hide();
  }

  componentWillMount() {
    if (this.props.active) {
      this.show();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      if (this.state.visible && this.props.hideTrigger === 'custom') {
        if (!nextProps.active) {
          this.hide();
        }
      }
      if (!this.state.visible && this.props.showTrigger === 'custom') {
        if (nextProps.active) {
          this.show();
        }
      }
    }
  }

  render() {
    const child = this.props.children;
    return cloneElement(child, {
      ref: ref => this._childNode = ReactDOM.findDOMNode(ref),
      onClick: this._chainCallbacks(child.props.onClick, this._onClick),
      onMouseEnter: this._chainCallbacks(child.props.onMouseEnter, this._onMouseEnter),
      onMouseLeave: this._chainCallbacks(child.props.onMouseLeave, this._onMouseLeave),
      onFocus: this._chainCallbacks(child.props.onFocus, this._onFocus),
      onBlur: this._chainCallbacks(child.props.onBlur, this._onBlur)
    });
  }

  _chainCallbacks = (first, second) => {
    return args => {
      if (first) {
        first.apply(this, args);
      }
      if (second) {
        second.apply(this, args);
      }
    };
  }

  show() {
    if (this.props.disabled) {
      return;
    }
    if (this._unmounted) {
      return;
    }
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }
    if (this._showTimeout) {
      return;
    }
    this._showTimeout = setTimeout(() => {
      this.setState({visible: true}, () => {
        if (!this._mountNode) {
          this._mountNode = document.createElement('div');
          document.body.appendChild(this._mountNode);
        }
        this._showTimeout = null;
        this.componentDidUpdate();
      });
    }, this.props.showDelay);
  }

  hide() {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
    }
    if (this._hideTimeout) {
      return;
    }
    this._hideTimeout = setTimeout(() => {
      if (this._mountNode) {
        ReactDOM.unmountComponentAtNode(this._mountNode);
        document.body.removeChild(this._mountNode);
        this._mountNode = this._tooltipNode = null;
      }
      this._hideTimeout = null;
      if (!this._unmounted) {
        this.setState({visible: false});
      }
    }, this.props.hideDelay);
  }

  _hideOrShow(event) {
    if (this.state.visible && this.props.hideTrigger === event) {
      this.hide();
    }
    if (!this.state.visible && this.props.showTrigger === event) {
      this.show();
    }
  }

  _onBlur() {
    this._hideOrShow('blur');
  }
  _onFocus() {
    this._hideOrShow('focus');
  }

  _onClick() {
    this._hideOrShow('click');
  }

  _onMouseEnter() {
    this._hideOrShow('mouseenter');
  }

  _onMouseLeave() {
    this._hideOrShow('mouseleave');
  }

  _updatePosition() {
    if (this._tooltipNode && this._childNode) {
      const style = this._adjustPosition(position(
        this._childNode.getBoundingClientRect(),
        this._tooltipNode.getBoundingClientRect(), {
          placement: this.props.placement,
          alignment: this.props.alignment,
          margin: 20
        }
      ));
      this.setState({
        style: {
          top: `${style.top}px`,
          left: `${style.left}px`
        },
        arrowStyle: this._adjustArrowPosition(this.props.placement, this.props.moveArrowTo)
      });
    }
  }

  _adjustArrowPosition(placement, moveTo) {
    if (moveTo) {
      const isPositive = moveTo > 0;
      const pixels = isPositive ? moveTo : -moveTo;
      if (['top', 'bottom'].includes(placement)) {
        return isPositive ? {left: `${pixels}px`} : {left: 'auto', right: `${pixels}px`};
      }
      return isPositive ? {top: `${pixels}px`} : {top: 'auto', bottom: `${pixels}px`};
    }
    return {};
  }

  _adjustPosition(originalPosition) {
    const {x = 0, y = 0} = this.props.moveBy || {};
    return {
      left: originalPosition.left + x,
      top: originalPosition.top + y
    };
  }

  isShown() {
    return this.state.visible;
  }

  willBeShown() {
    return !!this._showTimeout;
  }

  willBeHidden() {
    return !!this._hideTimeout;
  }

}

export default Tooltip;
