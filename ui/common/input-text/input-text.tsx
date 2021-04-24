import * as React from 'react';
import block from 'bem-css-modules';
import style from './input-text.module.sass';

const b = block(style);

type InputTextProps = {
  isValid: boolean,
  name: string,
  type: 'text' | 'password',
  value: string | number,
  errors: string | undefined,
  placeholder: string,
  onChange: (e: React.FormEvent<HTMLInputElement>) => void,
  onBlur: (e: React.FormEvent<HTMLInputElement>) => void,
};
type InputTextState = {};

export class InputText extends React.Component<InputTextProps, InputTextState> {

  static defaultProps = {
    type: 'text',
    placeholder: '',
    errors: undefined
  };

  render() {
    const { name, type, value, placeholder, isValid, onChange, onBlur } = this.props;
    return (
      <input placeholder={placeholder}
             className={b(null, {
               notValid: !isValid
             })}
             type={type}
             name={name}
             value={value}
             onChange={onChange}
             onBlur={onBlur} />
    );
  }
}
