import ALERT_TYPES from '../data/enums/AlertTypes';

const Alert = (type, message) => {
  switch (type) {
    case ALERT_TYPES.ERROR:
      alert('error: ' + message);
      break;
    case ALERT_TYPES.WARNING:
      alert('warning: ' + message);
      break;
    case ALERT_TYPES.SUCCESS:
      alert('success: ' + message);
      break;
    default:
      alert(message);
      break;
  }
};

export default Alert;
