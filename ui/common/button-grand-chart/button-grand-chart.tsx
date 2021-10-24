import * as React from 'react';
import block from 'bem-css-modules';
import style from './button-grand-chart.module.sass';
import { SERVICE_NAME } from '../../../constants';

const b = block(style);

type ButtonGrandChartProps = {
  service: SERVICE_NAME;
  onClick: () => Promise<void>;
};
type ButtonGrandChartState = {};

export class ButtonGrandChart extends React.Component<ButtonGrandChartProps, ButtonGrandChartState> {
  static defaultProps = {
    onClick: () => console.log('Not set handler')
  };

  render() {
    const { service, children, ...props } = this.props;
    return (
      <button {...props} className={b(null, { [service]: true })}>
        {children}
      </button>
    );
  }
}
