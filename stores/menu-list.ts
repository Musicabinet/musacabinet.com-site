import { action, makeObservable, observable } from 'mobx';
import { MenuI, MenuType } from '../interfaces';

export class MenuListStore {

  @observable list: MenuI[] = [{
    title: 'About',
    link: 'about',
    type: MenuType.DEFAULT,
    is_active: false
  }, {
    title: 'School',
    link: 'school/guitar',
    type: MenuType.SCHOOL,
    is_active: false,
    children: [{
      title: 'Guitar',
      link: 'school/guitar',
      type: MenuType.DEFAULT,
      is_active: false
    }, {
      title: 'Keyboard',
      link: 'school/keyboard',
      type: MenuType.DEFAULT,
      is_active: false
    }, {
      title: 'Saxophone',
      link: 'school/saxophone',
      type: MenuType.DEFAULT,
      is_active: false
    }]
  },
    {
      title: 'College',
      link: 'college/guitar',
      type: MenuType.COLLEGE,
      is_active: false,
      children: [{
        title: 'Guitar',
        link: 'college/guitar',
        type: MenuType.DEFAULT,
        is_active: false
      }, {
        title: 'Keyboard',
        link: 'college/keyboard',
        type: MenuType.DEFAULT,
        is_active: false
      }, {
        title: 'Saxophone',
        link: 'college/saxophone',
        type: MenuType.DEFAULT,
        is_active: false
      }]
    },
    {
      title: 'University',
      link: 'system/university/guitar',
      type: MenuType.UNIVERSITY,
      is_active: false,
      children: [{
        title: 'Guitar',
        link: 'university/guitar',
        type: MenuType.DEFAULT,
        is_active: false
      }, {
        title: 'Keyboard',
        link: 'university/keyboard',
        type: MenuType.DEFAULT,
        is_active: false
      }, {
        title: 'Saxophone',
        link: 'university/saxophone',
        type: MenuType.DEFAULT,
        is_active: false
      }]
    },
    {
      title: 'Pricing',
      link: 'pricing',
      type: MenuType.DEFAULT,
      is_active: false
    },
    {
      title: 'Contact',
      link: 'contact',
      type: MenuType.DEFAULT,
      is_active: false
    }];

  @observable cabinet_list: MenuI[] = [{
    title: 'Your day',
    link: '',
    type: MenuType.DEFAULT,
    is_active: false
  }, {
    title: 'Your subscriptions',
    link: '',
    type: MenuType.DEFAULT,
    is_active: true
  }, {
    title: 'Your statistics',
    link: '',
    type: MenuType.DEFAULT,
    is_active: false
  }, {
    title: 'Tutorials',
    link: '',
    type: MenuType.DEFAULT,
    is_active: false
  }, {
    title: 'Extra lessons',
    link: '',
    type: MenuType.DEFAULT,
    is_active: false
  }];

  constructor(initialData: MenuListStore | null) {
    makeObservable(this);
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: MenuListStore) {
    const { list, cabinet_list } = data;
    this.list = list;
    this.cabinet_list = cabinet_list;
  }

}
