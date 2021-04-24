export { Portal } from './portal';

export const getAvatarLink = (avatar_name: string): string => {
  return avatar_name ? `${CONTENT_URL}${avatar_name}` : '';
};
