import React, {PropTypes, Component} from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

import TextField from '../../src/TextField';
import Input from '../../src/Input';
import Label from '../../src/Label';

export default class Form extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    withLabel: PropTypes.bool,
    label: PropTypes.object,
    input: PropTypes.object
  };

  componentDidUpdate(props) {
    props.onChange(reactElementToJSXString(this.getComponent()));
  }

  componentDidMount() {
    this.props.onChange(reactElementToJSXString(this.getComponent()));
  }

  getComponent() {
    return (
      <TextField>
        {this.props.withLabel ? <Label for="firstName" {...this.props.label}/> : null}
        <Input id="firstName" {...this.props.input}/>
      </TextField>
    );
  }

  render() {
    return this.getComponent();
  }
}
