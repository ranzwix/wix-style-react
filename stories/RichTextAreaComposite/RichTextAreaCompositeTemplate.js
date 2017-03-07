import React, {PropTypes, Component} from 'react';
import RichTextAreaComposite from '../../src/RichTextAreaComposite';
import RichTextArea from '../../src/RichTextArea';
import Label from '../../src/Label';
import reactElementToJSXString from 'react-element-to-jsx-string';

export default class Form extends Component {

    static propTypes = {
      withLabel: PropTypes.bool,
      label: PropTypes.object,
      richTextArea: PropTypes.object
    };

    componentDidUpdate(props) {
      props.onChange(reactElementToJSXString(this.getComponent()));
    }

    componentDidMount() {
      this.props.onChange(reactElementToJSXString(this.getComponent()));
    }

    getComponent() {
      return (
        <RichTextAreaComposite>
          {this.props.withLabel ? <Label {...this.props.label}/> : null}
          <RichTextArea {...this.props.richTextArea}/>
        </RichTextAreaComposite>
      );
    }

    render() {
      return this.getComponent();
    }
}