import React from 'react';
import ReactDOM from 'react-dom';

const MOUSE_EVENTS_SUPPORTED = ['click'];

class WixComponent extends React.Component {

  constructor(params) {
    super(params);
    this._addDataHook = this._addDataHook.bind(this);
    this._supportOnClickOutside = this._supportOnClickOutside.bind(this);
    this._onMouseEventsHandler = this._onMouseEventsHandler.bind(this);
  }

  _onMouseEventsHandler(e) {
    let current = e.target;
    const componentNode = ReactDOM.findDOMNode(this);
    while (current.parentNode) {
      if (current === componentNode) {
        return;
      }
      current = current.parentNode;
    }

    if (current !== document) {
      return;
    }

    this.onClickOutside(e);
  }

  _addDataHook(dataHook) {
    ReactDOM.findDOMNode(this).setAttribute('data-hook', dataHook);
  }

  _supportOnClickOutside() {
    MOUSE_EVENTS_SUPPORTED.forEach(eventName => {
      document.addEventListener(eventName, this._onMouseEventsHandler, true);
    });

    this._boundEvents = MOUSE_EVENTS_SUPPORTED;
  }

  componentDidMount() {
    const {dataHook} = this.props;
    if (dataHook) {
      this._addDataHook(dataHook);
    }

    if (typeof this.onClickOutside === 'function') {
      this._supportOnClickOutside();
    }
  }

  componentWillUnmount() {
    if (this._boundEvents) {
      this._boundEvents.forEach(eventName => {
        document.removeEventListener(eventName, this._onMouseEventsHandler, true);
      });
    }
  }
}

WixComponent.propTypes = {
  dataHook: React.PropTypes.string
};

export default WixComponent;
