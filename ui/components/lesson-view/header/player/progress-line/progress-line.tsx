import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './progress-line.module.sass';
import { SERVICE_NAME } from '../../../../../../constants';

const b = block(style);

type ProgressLineProps = {
  service_name: SERVICE_NAME
};
type ProgressLineState = {};

@inject(() => ({}))
@observer
export class ProgressLine extends React.Component<ProgressLineProps, ProgressLineState> {

  static defaultProps = {
    service_name: SERVICE_NAME.SCHOOL
  };

  handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    console.log({ value });
  };

  render() {
    const { service_name } = this.props;

    return (
      <div className={b(null, { [service_name]: true })}>
        <input type='range'
               name='progress'
               className={b('line')}
               step={0.1}
               max={100}
               min={0}
               defaultValue={0}
               onChange={this.handleOnChange} />
      </div>
    );
  }
}
