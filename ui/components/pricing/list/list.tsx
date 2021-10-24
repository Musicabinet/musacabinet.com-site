import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './list.module.sass';
import { ProductsStore, RootStore } from '../../../../stores';
import { Item } from './item';

const b = block(style);

type ListProps = {
  productsStore: ProductsStore
};
type ListState = {};

@inject((store: RootStore) => ({
  productsStore: store.productsStore
}))
@observer
export class List extends React.Component<ListProps, ListState> {
  static defaultProps = {
    productsStore: {}
  };

  render() {
    const { productsStore } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className={b(null)}>
              {productsStore.getProducts.map((product) => {
                return <Item key={product.id} product={product} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
