import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import variables from '../../util/variables';

function LoadingIndicator({loading, size = 'large', darken = true, style}) {
  return (
    <Modal
      visible={loading}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: darken
            ? variables.colorBackgroundDarken
            : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}>
        <ActivityIndicator
          color={variables.colorPrimary}
          size={size}
          animating={true}
          style={{flex: 1}}
        />
      </View>
    </Modal>
  );
}

export default LoadingIndicator;
