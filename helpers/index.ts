import { UserStore } from '../stores';
import { SERVICE_ID } from '../constants';
import mobile from 'is-mobile';
import { LIST_ICON } from '../ui/common/icons';

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

  if (minutes < 10) {
    return hours + ':0' + minutes;
  }

  return hours + ':' + minutes;
};


export const getIconFromInstrumentId = (instrument_id: number): LIST_ICON => {
  switch (instrument_id){
    case 1:
    case 3:
    case 7:
      return LIST_ICON.GUITAR;
    case 2:
    case 5:
    case 8:
      return LIST_ICON.KEYBOARD;
    case 4:
    case 6:
    case 9:
      return LIST_ICON.SAXOPHONE;
    default:
      return LIST_ICON.GUITAR;

  }
};
