import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './volume-control.module.sass';
import { RootStore } from '../../../stores';
import { SERVICE_NAME } from '../../../constants';
import { handleDetectClick } from '../../../helpers';

const b = block(style);

type VolumeControlProps = {
  circle: boolean,
  service_name: SERVICE_NAME,
  name: string,
  min: number,
  max: number,
  step: number,
  defaultValue: number,
  onChange: (name: string, value: number, e?: React.FormEvent<HTMLInputElement>) => void
};
type VolumeControlState = {
  show: boolean
};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name
}))
@observer
export class VolumeControl extends React.Component<VolumeControlProps, VolumeControlState> {

  controlVolumeRef = React.createRef<HTMLDivElement>();

  static defaultProps = {
    circle: false,
    service_name: SERVICE_NAME.SCHOOL,
    min: 0,
    max: 1,
    step: 0.1,
    onChange: () => console.log('Not set handler')
  };

  state = {
    show: false
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (e: MouseEvent) => {
    handleDetectClick(this.controlVolumeRef, this.handleOnClose, e);
  };

  handleOnShow = (e: React.FormEvent<HTMLButtonElement>) => {
    this.setState(() => ({ show: true }));

    e.preventDefault();
    e.stopPropagation();
  };

  handleOnClose = () => {
    this.setState(() => ({ show: false }));
  };

  handlerOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const { name, value } = e.currentTarget;

    onChange(name, Number(value), e);
  };

  render() {
    const { service_name, name, max, min, step, defaultValue, circle } = this.props;

    return (
      <div ref={this.controlVolumeRef}
           className={b(null, {
             [service_name]: true
           })}>

        <div className={b('wrapper')}>
          <div className={b('lines')}>
            <div className={b('line')} />
            <div className={b('line')} />
            <div className={b('line')} />
            <div className={b('line')} />
            <div className={b('line')} />
          </div>
          <input type='range'
                 name={name}
                 max={max}
                 min={min}
                 step={step}
                 defaultValue={defaultValue}
                 aria-orientation='vertical'
                 className={b('range', { circle })}
                 onChange={this.handlerOnChange} />
        </div>
      </div>
    );
  }
}
