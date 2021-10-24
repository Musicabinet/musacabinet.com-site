import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './types.module.sass';
import { PRODUCT_DURATION } from '../../../../interfaces';
import { TypeButton } from './type-button';
import { PricingStore, RootStore } from '../../../../stores';

const b = block(style);

type TypesProps = {
  pricingStore: PricingStore,
};
type TypesState = {};

@inject((store: RootStore) => ({
  pricingStore: store.pricingStore
}))
@observer
export class Types extends React.Component<TypesProps, TypesState> {
  static defaultProps = {
    pricingStore: {},
  };

  render() {
    const { pricingStore } = this.props;

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className={b(null)}>
              {Object.keys(PRODUCT_DURATION).map((product_duration: string) => {
                return (
                  <TypeButton key={product_duration}
                              selected={product_duration === pricingStore.selected_product_duration}
                              onSetProductDuration={pricingStore.setSelectedProductDuration}>
                    {product_duration}
                  </TypeButton>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
