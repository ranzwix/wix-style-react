import React, {Component, PropTypes} from 'react';
import Checkbox from 'wix-style-react/Checkbox';

const style = {
  display: 'flex',
  padding: '0 5px',
  width: '600px',
  justifyContent: 'space-between',
  lineHeight: '22px'
};

class ControlledCheckbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    supportThreeStates: PropTypes.bool
  };

  constructor() {
    super();
    this.state = {checked: false, indeterminate: false};
  }

  render() {
    const onChange = () => {
      if (this.props.supportThreeStates) {
        if (this.state.indeterminate) {
          this.setState({indeterminate: false});
        } else if (!this.state.checked) {
          this.setState({indeterminate: true});
          this.setState({checked: true});
        } else {
          this.setState({checked: false});
        }
      } else {
        this.setState({checked: !this.state.checked});
      }
    };

    return (
      <Checkbox indeterminate={this.state.indeterminate} checked={this.state.checked} onChange={onChange} {...this.props}/>
    );
  }
}

export default () =>
  <div className="ltr" style={style}>
    <ControlledCheckbox>Make my profile visible</ControlledCheckbox>
    <ControlledCheckbox indeterminate>I work only with indeterminate mode</ControlledCheckbox>
    <ControlledCheckbox supportThreeStates>I have three states</ControlledCheckbox>
  </div>;
