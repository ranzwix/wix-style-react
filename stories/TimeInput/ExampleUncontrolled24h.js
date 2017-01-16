import React, {PropTypes, Component} from 'react';
import TimeInput from 'wix-style-react/TimeInput';

export default class UncontrolledSlider extends Component {
  static propTypes = {
    startTime: PropTypes.object
  };

  constructor({value}) {
    super();
  }

  render() {
    const onChange = value => this.setState({value});

    return (
      <TimeInput {...this.props} startTime={this.props.startTime} onChange={onChange} disableAmPm/>
    );
  }
}
