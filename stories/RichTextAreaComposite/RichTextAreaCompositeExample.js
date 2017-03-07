import React, {Component, PropTypes} from 'react';
import RadioGroup from '../../src/RadioGroup';
import Label from '../../src/Label';
import TextField from '../../src/TextField';
import TextArea from '../../src/TextArea';
import Input from '../../src/Input';
import InputArea from '../../src/InputArea';
import styles from './RichTextAreaComposite.scss';
import ToggleSwitch from '../../src/ToggleSwitch';
import RichTextAreaCompositeTemplate from './RichTextAreaCompositeTemplate';

class RichTextAreaCompositeExample extends Component {

  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    withLabel: true,
    label: {
      appearance: 'T1.1',
      children: 'First name'
    },
    richTextArea: {
      placeholder: 'Please type your text here...',
      resizable: false
    }
  };

  setComponentState(componentName, obj) {
    this.setState(prevState => {
      prevState[componentName] = {...this.state[componentName], ...obj};
      Object.keys(prevState[componentName])
          .forEach(k => !prevState[componentName][k] && delete prevState[componentName][k]);
      return prevState;
    });
  }

  render() {
    return (
        <from className={styles.form}>
          <div className={styles.input}>
            <div className={styles.option}>
              <Label>Show label</Label>
              <div className={styles.flex}>
                <Input
                    size="small"
                    value={this.state.label.children}
                    onChange={e => this.setComponentState('label', {children: e.target.value})}/>&nbsp;
                <ToggleSwitch
                    size="small"
                    checked={this.state.withLabel}
                    onChange={() => this.setState({withLabel: !this.state.withLabel})}/>
              </div>
            </div>
            <div className={styles.option}>
              <Label for="placeholderInput">Placeholder</Label>
              <div className={styles.flex}>
                <Input
                    id="placeholderInput"
                    size="normal"
                    theme="normal"
                    value={this.state.richTextArea.placeholder}
                    onChange={event => this.setComponentState('richTextArea', {placeholder: event.target.value})}/>
              </div>
            </div>
          </div>

          <div className={styles.output}>
            <RichTextAreaCompositeTemplate {...this.state} onChange={this.props.onChange}/>
          </div>
        </from>
    );
  }
}

export default RichTextAreaCompositeExample;

