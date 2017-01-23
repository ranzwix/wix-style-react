import React, {Component, PropTypes} from 'react';
import InputArea from 'wix-style-react/InputArea';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '200px',
  lineHeight: '22px'
};

class ControlledInputArea extends Component {
  static propTypes = {
    value: PropTypes.bool
  };

  constructor({value = ''}) {
    super();
    this.state = {value};
  }

  render() {
    const onChange = event => this.setState({value: event.target.value});
    const onClear = event => {
      this.setState({value: ''});
      this.refs.inputtest.focus();
    };

    return (
      <InputArea {...this.props} error={this.state.value === 'Starwars'} value={this.state.value} onChange={onChange} onClear={onClear}/>
    );
  }
}

export default () =>
  <div className="ltr" style={style}>
    <span>This shows an error for &quot;Starwars&quot;</span>
    <ControlledInputArea/>
  </div>;
