export { Portal } from './portal';

export const getAvatarLink = (avatar_name: string): string => {
  return avatar_name ? `${CONTENT_URL}${avatar_name}` : '';
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


export const ucFirst = (value: string): string => {
  return value[0].toUpperCase() + value.slice(1).toLowerCase();
};
