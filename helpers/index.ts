import { UserStore } from '../stores/user';
import { SERVICE_ID } from '../constants';
import mobile from 'is-mobile';

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

export const checkSubscription = (user: UserStore, service_id: SERVICE_ID, instrument_id: number) => {
  const isPurchase = user.purchases.filter((purchase) => {
    return purchase.service_id === service_id && purchase.instrument_id === instrument_id;
  });

  return isPurchase.length > 0;
};

export const isMobile = () => mobile();

export const getTimeFromMin = (min: number) => {
  let hours = Math.trunc(min / 60);
  let minutes = min % 60;

  if(minutes < 10){
    return hours + ':0' + minutes;
  }

  return hours + ':' + minutes;
};
