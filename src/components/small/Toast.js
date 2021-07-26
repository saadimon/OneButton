import React from 'react';
import RNToast from 'react-native-toast-message';

function Toast() {
  return <RNToast visibilityTime={4000} ref={ref => RNToast.setRef(ref)} />;
}

export default Toast;
