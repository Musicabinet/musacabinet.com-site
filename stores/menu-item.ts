import { action, makeObservable, observable } from 'mobx';
import { MenuI, MenuType } from '../interfaces';

export class MenuItemStore implements MenuI {

  @observable title = '';
  @observable link = '';
  @observable type = MenuType.DEFAULT;
  @observable is_active = false;
  @observable children: MenuItemStore[] = [];

  constructor(initialData: MenuItemStore | null) {
    makeObservable(this);
    if (initialData) {
      this.fillingStore(initialData);
    }
  }

  @action
  fillingStore(data: MenuItemStore) {
    const { title, link, type, is_active, children } = data;

    this.title = title;
    this.link = link;
    this.type = type;
    this.is_active = is_active;
    this.children = (children || []).map((menu) => new MenuItemStore(menu));
  }

}
