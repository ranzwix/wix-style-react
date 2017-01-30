import React, {PropTypes, Component} from 'react';
import Modal from 'wix-style-react/Modal';
import Button from 'wix-style-react/Button';
import MessageBoxLayout2 from 'wix-style-react/MessageBox/MessageBoxLayout2';

class ControlledModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool
  };

  constructor({isOpen = false}) {
    super();
    this.state = {isOpen};
  }

  render() {
    const setState = state => () => this.setState(state);

    const close = setState({isOpen: false});
    const open = setState({isOpen: true});

    return (
      <div>
        <Button onClick={open} >Open Blue Modal</Button>
        <Modal isOpen={this.state.isOpen} onRequestClose={close} contentLabel="Modal Example">
          <MessageBoxLayout2 theme="blue" title="title" confirmText="OK" cancelText="Cancel" onOk={close} onCancel={close}>
              Hello blue world!
          </MessageBoxLayout2>
        </Modal>
      </div>
    );
  }
}

export default () =>
  <div>
    <ControlledModal/>
  </div>;
