import * as React from 'react';
import block from 'bem-css-modules';
import style from './modal.module.sass';
import { Portal } from '../../../helpers';

const b = block(style);

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  size: 'middle' | 'large' | 'small';
  auto: boolean;
};
type ModalState = {};

export class Modal extends React.Component<ModalProps, ModalState> {
  public modalRef = React.createRef<HTMLDivElement>();

  static defaultProps = {
    isOpen: false,
    size: 'middle',
    auto: false
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (e: MouseEvent) => {
    const { onClose } = this.props;

    // @ts-ignoreReactDOM.createPortal
    if (this.modalRef && this.modalRef.current && !this.modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  render() {
    const { isOpen, children, size, auto, onClose } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <Portal>
        <div className={b('overlay')} />
        <div ref={this.modalRef} className={b(null, { [size]: true, auto })}>
          <button className={b('close')} onClick={onClose} />
          <div className={b('container')}>{children}</div>
        </div>
      </Portal>
    );
  }
}
