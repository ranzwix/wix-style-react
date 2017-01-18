import React, {PropTypes, Component} from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

import Breadcrumbs from '../../src/Breadcrumbs/Breadcrumbs';

export default class Form extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    size: React.PropTypes.oneOf(['medium', 'large']),
    theme: React.PropTypes.oneOf(['onWhiteBackground', 'onGrayBackground', 'onDarkBackground']),
    activeId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  };

  componentDidUpdate(props) {
    props.onChange(reactElementToJSXString(this.getComponent()));
  }

  componentDidMount() {
    this.props.onChange(reactElementToJSXString(this.getComponent()));
  }

  getComponent() {
    return (
      <Breadcrumbs items={[{id: '1', value: 'First item'}, {
        id: '2',
        value: 'Linked item',
        link: 'http://www.wix.com'
      }, {id: '3', value: 'Third item'}]}
                   activeId={this.props.activeId}
                   size={this.props.size}
                   theme={this.props.theme}
                   onClick={() => {
                   }}>
      </Breadcrumbs>
    );
  }

  render() {
    return this.getComponent();
  }
}
