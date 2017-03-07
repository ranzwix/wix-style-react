import React, {Component, PropTypes} from 'react';
import RadioGroup from '../../src/RadioGroup';
import Label from '../../src/Label';
import TextField from '../../src/TextField';
import TextArea from '../../src/TextArea';
import Input from '../../src/Input';
import InputArea from '../../src/InputArea';
import ToggleSwitch from '../../src/ToggleSwitch';
import RichTextAreaTemplate from './RichTextAreaTemplate';
import styles from './RichTextAreaExample.scss';

class RichTextAreaExample extends Component {
  state = {
    error: false,
    errorMessage: '',
    resizable: false,
    placeholder: 'Rich placeholder',
    value: '<p>$$$ Rich text area</p><strong>bold text here</strong><ul><li>The amazing fox lives in <a href="wix.com">Lithuania</a></li></ul>'
  };

  handleRichTextAreaChange = value => {
    this.setState({value});
  };

  render() {
    return (
      <div className={styles.form}>
        <div className={styles.input}>
          <div className={styles.option}>
            <TextField>
              <Label for="placeholderInput">Placeholder</Label>
              <div className={styles.flex}>
                <Input
                  id="placeholderInput"
                  size="normal"
                  theme="normal"
                  value={this.state.placeholder}
                  onChange={event => this.setState({placeholder: event.target.value})}
                  />
              </div>
            </TextField>
          </div>
          <div className={styles.option}>
            <Label>Error</Label>
            <div className={styles.radioGroup}>
              <RadioGroup
                display="horizontal"
                value={this.state.error}
                onChange={error => this.setState({error})}
              >
                <RadioGroup.Radio value={false}>False</RadioGroup.Radio>
                <RadioGroup.Radio value={true}>True</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>
          {this.renderErrorMessageInput()}
          <div className={styles.option}>
            <Label>Disabled</Label>
            <div className={styles.radioGroup}>
              <RadioGroup
                display="horizontal"
                value={this.state.disabled}
                onChange={disabled => this.setState({disabled})}
                >
                <RadioGroup.Radio value={false}>False</RadioGroup.Radio>
                <RadioGroup.Radio value={true}>True</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>
          <div className={styles.option}>
            <Label>Resizable: </Label>
            <ToggleSwitch
              size="small"
              checked={this.state.resizable}
              onChange={() => this.setState({resizable: !this.state.resizable})}
            />
          </div>
        </div>
        <div className={styles.output}>
          <RichTextAreaTemplate
            onTemplateChange={this.props.onChange}
            onChange={this.handleRichTextAreaChange}
            disabled={this.state.disabled ? 'true' : ''}
            {...this.state}
            />
          <div className={styles.output}>
            <TextArea>
              <Label for="placeholderInput">Output value</Label>
              <InputArea
                id="placeholderInput"
                size="normal"
                theme="normal"
                value={this.state.value}
                resizable
                readOnly
                />
            </TextArea>
          </div>
        </div>
      </div>
    );
  }

  renderErrorMessageInput() {
    const {error, errorMessage} = this.state;

    if (!error) {
      return null;
    }

    return (
      <div className={styles.output}>
        <TextField>
          <Label for="errorMessageInput">Error message</Label>
          <Input
            id="errorMessageInput"
            size="normal"
            theme="normal"
            value={errorMessage}
            onChange={event => this.setState({errorMessage: event.target.value})}
            />
        </TextField>
      </div>
    );
  }
}

RichTextAreaExample.propTypes = {
  onChange: PropTypes.func,
};

export default RichTextAreaExample;

