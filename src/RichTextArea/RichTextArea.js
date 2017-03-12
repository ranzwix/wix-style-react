import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {Editor} from 'slate';
import WixComponent from '../WixComponent';
import Tooltip from '../Tooltip';
import SvgExclamation from '../svg/Exclamation.js';
import RichTextEditorToolbar from './RichTextAreaToolbar';
import htmlSerializer from './htmlSerializer';
import styles from './RichTextArea.scss';
import isImage from 'is-image';
import isUrl from 'is-url';

const DEFAULT_NODE = 'paragraph';

class RichTextArea extends WixComponent {
  /* eslint-disable react/prop-types */
  schema = {
    nodes: {
      'unordered-list': props => <ul {...props.attributes}>{props.children}</ul>,
      'list-item': props => <li {...props.attributes}>{props.children}</li>,
      'ordered-list': props => <ol {...props.attributes}>{props.children}</ol>,
      link: props => {
        const {data} = props.node;
        const href = data.get('href');
        return <a className={styles.link} {...props.attributes} href={href}>{props.children}</a>;
      },
      image: props => {
        const {node, state} = props;
        const isFocused = state.selection.hasEdgeIn(node);
        const src = node.data.get('src');
        return (<img data-hook="editor-image" src={src} className={classNames(styles.editorImage, {[styles.activeEditorImage]: isFocused})}/>);
      }
    },
    marks: {
      bold: {
        fontWeight: 'bold'
      },
      italic: {
        fontStyle: 'italic'
      },
      underline: {
        textDecoration: 'underline'
      }
    }
  };
  /* eslint-disable */

  constructor(props) {
    super(props);

    const editorState = htmlSerializer.deserialize(props.value);
    this.state = {
      editorState,
    };
    this.lastValue = htmlSerializer.serialize(editorState);
  }

  setEditorState = editorState => {
    this.setState({editorState}, this.triggerChange);
  };

  triggerChange() {
    const {onChange} = this.props;
    const serialized = htmlSerializer.serialize(this.state.editorState);

    if (this.lastValue !== serialized) {
      this.lastValue = serialized;
      onChange && onChange(serialized);
    }
  }

  hasBlock = type => this.state.editorState.blocks.some(node => node.type == type);

  hasListBlock = type => {
    const {editorState} = this.state;
    return editorState.blocks.some(node => {
      const parent = editorState.document.getParent(node.key);
      return parent && parent.type === type;
    });
  };

  hasMark = type => this.state.editorState.marks.some(mark => mark.type == type);

  hasLink = () => this.state.editorState.inlines.some(inline => inline.type === 'link');

  handleButtonClick = (action, type) => {
    switch (action) {
      case 'mark':
        return this.handleMarkButtonClick(type);
      case 'block':
        return this.handleBlockButtonClick(type);
      case 'link':
        return this.handleLinkButtonClick(type);
      case 'image':
        return this.handleImageButtonClick(type);
    }
  };

  handleMarkButtonClick = type => {
    const editorState = this.state.editorState
      .transform()
      .toggleMark(type)
      .apply();

    this.setEditorState(editorState);
  };

  handleImageButtonClick = type => {
    this.props.onImageRequest(this.handleImageInput.bind(this));
  }

  handleImageInput = text => {
    if (this.isValidImage(text)) {
      const editorState = this.insertImage(this.state.editorState, text);
      this.setEditorState(editorState);
    }
  }

  onPaste = (e, data, state, editor) => {
    switch (data.type) {
      case 'text': return this.onPasteText(data.text, state)
    }
  }

  onPasteText = (text, state) => {
    if (this.isValidImage(text)) {
      return this.insertImage(state, text);
    }
    return;
  }

  isValidImage = (text) => isUrl(text) && isImage(text);

  insertImage = (state, src) => {
    return state
      .transform()
      .insertBlock({
        type: 'image',
        isVoid: true,
        data: { src }
      })
      .apply();
  }

  handleBlockButtonClick = type => {
    let {editorState} = this.state;
    let transform = editorState.transform();
    const {document} = editorState;

    // Handle everything but list buttons.
    if (type !== 'unordered-list' && type !== 'ordered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        transform
          .setBlock(isActive ? '' : type)
          .unwrapBlock('unordered-list')
          .unwrapBlock('ordered-list');
      }

      else {
        transform
          .setBlock(isActive ? '' : type);
      }
    }

    // Handle the extra wrapping required for list buttons.
    else {
      const isList = this.hasBlock('list-item');
      const isType = editorState.blocks.some((block) => {
        return !!document.getClosest(block.key, parent => parent.type == type);
      });

      if (isList && isType) {
        transform
          .setBlock(DEFAULT_NODE)
          .unwrapBlock('unordered-list')
          .unwrapBlock('ordered-list');
      } else if (isList) {
        transform
          .unwrapBlock(type == 'unordered-list' ? 'ordered-list' : 'unordered-list')
          .wrapBlock(type);
      } else {
        transform
          .setBlock('list-item')
          .wrapBlock(type);
      }
    }

    editorState = transform.apply();
    this.setState({editorState});
  };

  handleLinkButtonClick = ({href, text} = {}) => {
    const {editorState} = this.state;
    const transform = editorState.transform();
    if (this.hasLink()) {
      transform
        .unwrapInline('link');
    } else if (editorState.isExpanded) {
      transform
        .wrapInline({
          type: 'link',
          data: {href}
        })
        .focus()
        .collapseToEnd()
    } else {
      const linkContent = text || href;
      transform
        .insertText(linkContent)
        .extendBackward(linkContent.length)
        .wrapInline({
          type: 'link',
          data: {href}
        })
        .focus()
        .collapseToEnd();
    }

    this.setEditorState(transform.apply());
  };

  render = () => {
    const {editorState} = this.state;
    const {error, placeholder, disabled, resizable, onImageRequest} = this.props;
    const className = classNames(styles.container, {
      [styles.withError]: error,
      [styles.isFocused]: editorState.isFocused,
    });
    
    return (
      <div className={className}>
        <div className={classNames(styles.toolbar, {[styles.disabled]: disabled})}>
          <RichTextEditorToolbar
            disabled={disabled}
            onClick={this.handleButtonClick}
            onLinkButtonClick={this.handleLinkButtonClick}
            onImageButtonClick={onImageRequest ? this.handleImageButtonClick : null }
            hasMark={this.hasMark}
            hasListBlock={this.hasListBlock}
            hasLink={this.hasLink}
            isSelectionExpanded={editorState.isExpanded}
            />
        </div>
        <div className={classNames(styles.editorWrapper, {[styles.resizable]: resizable, [styles.disabled]: disabled})} data-hook="editor-wrapper">
          <Editor
            readOnly={disabled}
            placeholder={placeholder}
            placeholderClassName={styles.placeholder}
            className={classNames(styles.editor, {[styles.disabled]: disabled})}
            schema={this.schema}
            state={editorState}
            onPaste={this.onPaste}
            onChange={this.setEditorState}/>
          {this.renderError()}
        </div>
      </div>
    );
  };

  renderError = () => {
    const {errorMessage} = this.props;

    return (
      <Tooltip
        disabled={!errorMessage}
        placement="top"
        moveBy={{x: 2, y: 0}}
        alignment="center"
        content={errorMessage}
        theme="dark"
        >
        <div className={styles.exclamation}><SvgExclamation width={2} height={11}/></div>
      </Tooltip>
    );
  };
}

RichTextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onImageRequest: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.string), // TODO: use PropTypes.oneOf(),
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  resizable: PropTypes.bool
};

RichTextArea.defaultProps = {
  value: '<p></p>',
  errorMessage: '',
};

export default RichTextArea;