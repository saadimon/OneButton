import ALERT_TYPES from '../data/enums/AlertTypes';
import RNToast from 'react-native-toast-message';

// const basicConfig = {
//   position: 'bottom',
//   visibilityTime: 2000,
//   // autoHide: true,
//   bottomOffset: 50,
// };

const Alert = (type, message) => {
  switch (type) {
    case ALERT_TYPES.ERROR:
      RNToast.show({
        type: 'error',
        text1: 'Error!',
        text2: message || 'Something went wrong',
      });
      break;
    case ALERT_TYPES.WARNING:
      RNToast.show({
        type: 'info',
        text1: 'Warning!',
        text2: message,
      });
      break;
    case ALERT_TYPES.SUCCESS:
      RNToast.show({
        type: 'success',
        text1: 'Success!',
        text2: message,
      });
      break;
    case ALERT_TYPES.INFO:
      RNToast.show({
        type: 'info',
        text1: 'Info!',
        text2: message,
      });
      break;
    default:
      alert(message);
      break;
  }
};

export default Alert;
