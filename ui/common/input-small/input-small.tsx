import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './input-small.module.sass';

const b = block(style);

type InputSmallProps = {
  label: string,
  name: string,
  value: string,
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
};
type InputSmallState = {};

@inject(() => ({}))
@observer
export class InputSmall extends React.Component<InputSmallProps, InputSmallState> {
  render() {
    const { label, name, value, onChange } = this.props;

    return (<div className={b(null)}>
      <label htmlFor={`input_${name}`} className={b('label')}>{label}</label>
      <input type='text'
             id={'input_name'}
             name={name}
             value={value}
             className={b('input')}
             onChange={onChange} />
    </div>);
  }
}
