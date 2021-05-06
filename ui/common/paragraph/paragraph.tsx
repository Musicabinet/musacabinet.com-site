import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './paragraph.module.sass';

const b = block(style);

type ParagraphProps = {
  className: string
};
type ParagraphState = {};

@inject(() => ({}))
@observer
export class Paragraph extends React.Component<ParagraphProps, ParagraphState> {

  static defaultProps = {
    className: ''
  };

  render() {
    const { className, children } = this.props;

    return (
      <p className={`${b(null)} ${className}`}>{children}</p>
    );
  }
}
