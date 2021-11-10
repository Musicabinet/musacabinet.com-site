import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './block.module.sass';

const b = block(style);

type BlockProps = {
  name: string,
  days: any[]
};
type BlockState = {};

@inject(() => ({}))
@observer
export class Block extends React.Component<BlockProps, BlockState> {
  render() {
    const { name, days } = this.props;

    return (
      <div className={b(null)}>
        <div className={b('month')}>{name}</div>

        <div className={b('list')}>
          {days.map((day) => {
            return <div className={b('day', { empty: (day === null) })} />;
          })}
        </div>
      </div>
    );
  }
}
