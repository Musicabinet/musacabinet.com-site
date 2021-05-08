export { Portal } from './portal';

export const getAvatarLink = (avatar_name: string): string => {
  return avatar_name ? `${CONTENT_URL}/avatars/${avatar_name}` : '';
};

export const handleDetectClick = (container: any, onClose: () => void, e: MouseEvent) => {
  if (container && container.current) {
    if (e.target instanceof Node) {
      const isInside = container.current.contains(e.target);

      if (!isInside) {
        onClose();
      }
    }
  }
};
