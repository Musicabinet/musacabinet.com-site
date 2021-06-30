import * as React from 'react';
import { inject, observer } from 'mobx-react';
import block from 'bem-css-modules';
import style from './types.module.sass';
import { TERM_LIST } from '../../../../interfaces';
import { TypeButton } from './type-button';
import { RootStore } from '../../../../stores';

const b = block(style);

type TypesProps = {
  selected_term: TERM_LIST,
  onSetTerm: (value: TERM_LIST) => void
};
type TypesState = {};

@inject((store: RootStore) => ({
  selected_term: store.pricingStore.selected_term,
  onSetTerm: store.pricingStore.setSelectedTerm
}))
@observer
export class Types extends React.Component<TypesProps, TypesState> {

  static defaultProps = {
    selected_term: TERM_LIST.MONTHLY,
    onSetTerm: () => console.log('Not set handler')
  };

  render() {
    const { selected_term, onSetTerm } = this.props;

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className={b(null)}>
              {Object.keys(TERM_LIST).map((term) => {
                return <TypeButton key={term} selected={term === selected_term}
                                   onSetTerm={onSetTerm}>{term}</TypeButton>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
