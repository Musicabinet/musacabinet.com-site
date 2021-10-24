export enum MenuType {
  SCHOOL = 'school',
  COLLEGE = 'college',
  UNIVERSITY = 'university',
  DEFAULT = 'default'
}

export interface MenuI {
  title: string;
  link: string;
  type: MenuType;
  is_active: boolean;
  children?: MenuI[];
}
