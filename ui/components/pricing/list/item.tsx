import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './list.module.sass';
import {
  CloudPaymentOptionsI,
  CloudPaymentPaymentResult
} from '../../../../interfaces';
import { AuthStore, ModalsStore, PurchasesStore, RootStore, UserStore } from '../../../../stores';
import { ProductStore } from '../../../../stores/product';
import { InstrumentIcon } from '../../../common';
import { getIcon, LIST_ICON } from '../../../common/icons';
import { MODALS } from '../../../../constants';

const b = block(style);

type ItemProps = {
  product: ProductStore,
  authStore: AuthStore,
  modalsStore: ModalsStore,
  userStore: UserStore,
  purchasesStore: PurchasesStore
};
type ItemState = {};

@inject((store: RootStore) => ({
  authStore: store.authStore,
  modalsStore: store.modalsStore,
  userStore: store.userStore,
  purchasesStore: store.purchasesStore
}))
@observer
export class Item extends React.Component<ItemProps, ItemState> {

  static defaultProps = {
    authStore: {},
    modalsStore: {},
    userStore: {},
    purchasesStore: {}
  };

  handleOrder = async () => {
    const { product, authStore, modalsStore, userStore, purchasesStore } = this.props;

    // Если не доступен для продаже то отменяем клик
    if (!product.for_sale) {
      return false;
    }

    if (!authStore.isAuth) {
      modalsStore.show(MODALS.SIGN_IN);
      return false;
    }

    if (!authStore.isAuth) {
      modalsStore.show(MODALS.SIGN_IN);
      return false;
    }

    try {
      // @ts-ignore
      const widget = new window.cp.CloudPayments({
        language: 'en-US'
      });

      let data: any = {};
      let date = new Date();
      date.setMonth(date.getMonth() + 1);

      data.payload = {
        service_id: product.service_id,
        instrument_id: product.instrument_id,
        product_id: product.id,
        period: product.month,
        price: product.sale_price
      };

      data.CloudPayments = {
        recurrent: {
          interval: 'Month',
          period: product.month,
          startDate: date
        }
      };

      // Нажад на купить
      if (window) {
        // @ts-ignore
        window.gtag('event', 'begin_checkout');
      }

      widget.pay(
        'auth',
        {
          publicId: CLOUD_PAYMENTS_PUBLIC_ID,
          description: 'Pay order musicabinet.com',
          amount: product.sale_price,
          currency: 'USD',
          accountId: userStore.email,
          skin: 'mini',
          data: data,
          retryPayment: true
        },
        {
          onSuccess: async function(options: any) {
            // success
            console.log('onSuccess', options);
            let payload = options.data.payload;

            // Сохраняем платеж
            await purchasesStore.create(payload);


            //действие при успешной оплате
            if (window) {
              // @ts-ignore
              window.gtag('event', 'purchase', options.data.payload);
              window.location.href = '/cabinet';
            }
          },
          onFail: function(reason: any, options: any) {
            // fail
            console.log(reason, options);
          },
          onComplete: function(paymentResult: CloudPaymentPaymentResult, _options: CloudPaymentOptionsI) {
            if (paymentResult.success) {
            }
          }
        }
      );
    } catch (e) {
      console.error(`Error in method loadCloudPayments:`, e);
    }
  };

  onPay = () => {
  };

  isPurchase = (): boolean => {
    const { product, userStore } = this.props;
    return userStore.purchases.some((purchase) => purchase.product_id === product.id);
  };

  render() {
    const { product } = this.props;

    return (
      <div onClick={this.handleOrder}
           className={b('item', {
             [product.serviceName]: true
             //'not-hover': !plans.includes(selected_term)
           })}>
        <div className={b('icon')}>
          <InstrumentIcon icon={product.serviceNameUpperCase} service={'white'} />
        </div>
        <div className={b('name')}>{product.serviceName}</div>
        <div className={b('description')}>{product.level}</div>

        <div className={b('price')}>
          $ <span>{product.sale_price}</span>
        </div>
        <div className={b('old')}>${product.price}</div>

        <div className={b('action')}>
          {!this.isPurchase() && (
            <button disabled={!product.for_sale}
                    className={b('button', { [product.serviceName]: true })}>
              {product.for_sale ? 'Buy plan' : 'Unavailable'}
            </button>
          )}

        </div>


        <div className={b('list')}>
          {product.items.map((productItem) => {
            return (
              <div key={productItem.id} className={b('list-item')}>
                <i className={b('check', {
                  [product.serviceName]: true
                })}>{getIcon(LIST_ICON.CHECK, '')}</i>
                <span dangerouslySetInnerHTML={{ __html: productItem.name }} />
              </div>
            );
          })}
        </div>

        <div className={b('divider', { [product.serviceName]: true })} />
        <div className={b('extra')}>{product.description}</div>
      </div>
    );
  }
}
