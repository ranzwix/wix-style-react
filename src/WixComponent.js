import React from 'react';
import ReactDom from 'react-dom';

class WixComponent extends React.Component {

  constructor(params) {
    super(params);
    this.constructor.propTypes['data-hook'] = React.PropTypes.string;
  }

  componentDidMount() {
    const {dataHook} = this.props;
    if (dataHook) {
      ReactDom.findDOMNode(this).setAttribute('data-hook', dataHook);
    }
  }
}

WixComponent.propTypes = {
  dataHook: React.PropTypes.string
};

export default WixComponent;
