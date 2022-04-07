import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './volume-control.module.sass';
import { RootStore } from '../../../stores';
import { SERVICE_NAME } from '../../../constants';
import { handleDetectClick } from '../../../helpers';
import { getIcon, LIST_ICON } from '../icons';

const b = block(style);

type VolumeControlProps = {
  circle: boolean;
  service_name: SERVICE_NAME;
  name: string;
  min: number;
  max: number;
  step: number;
  defaultValue?: number;
  value?: number;
  isNegative: boolean;
  onChange: (name: string, value: number, e?: React.FormEvent<HTMLInputElement>) => void;
};
type VolumeControlState = {
  show: boolean;
};

@inject((store: RootStore) => ({
  service_name: store.systemStore.service_name
}))
@observer
export class VolumeControl extends React.Component<VolumeControlProps, VolumeControlState> {
  public controlVolumeRef = React.createRef<HTMLDivElement>();
  public inputRangeRef = React.createRef<HTMLInputElement>();
  public progressRef = React.createRef<HTMLDivElement>();

  static defaultProps = {
    circle: false,
    service_name: SERVICE_NAME.SCHOOL,
    min: 0,
    max: 1,
    step: 0.1,
    isNegative: false,
    onChange: () => console.log('Not set handler')
  };

  state = {
    show: false
  };

  componentDidMount() {
    const { defaultValue, value } = this.props;

    if(defaultValue){
      this.drawProgress(defaultValue);
    }

    if(value){
      this.drawProgress(value);
    }


    document.addEventListener('click', this.handleClickOutside);

    if (this.inputRangeRef.current) {
      this.inputRangeRef.current.oninput = (e: Event) => {
        const currentValue = Number((e.target as HTMLInputElement).value);
        this.drawProgress(currentValue);
      };
    }
  }

  componentDidUpdate(prevProps: Readonly<VolumeControlProps>) {
    if (prevProps.defaultValue !== this.props.defaultValue && this.props.defaultValue) {
      this.drawProgress(this.props.defaultValue);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  drawProgress = (value: number) => {
    const { isNegative } = this.props;
    let updateValuePercent = 0;

    if (isNegative) {
      updateValuePercent = 100 - Math.abs(value);
    } else {
      updateValuePercent = value;
    }

    if (this.progressRef.current) {
      this.progressRef.current.style.height = `calc(${updateValuePercent}% - 8px)`;
    }
  };

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
    const { service_name, name, max, min, step, defaultValue, circle, value } = this.props;

    console.log('value', value);

    return (
      <div
        ref={this.controlVolumeRef}
        className={b(null, {
          [service_name]: true
        })}
      >
        <div className={b('wrapper')}>
          {value ? (
            <input type='range'
                   name={name}
                   max={max}
                   min={min}
                   step={step}
                   value={value}
                   aria-orientation='vertical'
                   ref={this.inputRangeRef}
                   className={b('range', { circle })}
                   onChange={this.handlerOnChange}
            />
          ) : (
            <input type='range'
                   name={name}
                   max={max}
                   min={min}
                   step={step}
                   defaultValue={defaultValue}
                   aria-orientation='vertical'
                   ref={this.inputRangeRef}
                   className={b('range', { circle })}
                   onChange={this.handlerOnChange} />
          )}


          <div ref={this.progressRef}
               className={b('progress')} />
        </div>
        {getIcon(LIST_ICON.VOLUME_WITHOUT_VIBE, b('icon'))}
      </div>
    );
  }
}
