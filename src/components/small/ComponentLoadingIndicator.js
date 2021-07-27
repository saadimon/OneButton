import React from 'react';
import {ActivityIndicator, Dimensions, Text, View} from 'react-native';
import variables from '../../util/variables';

function ComponentLoadingIndicator({
  children,
  loading,
  size = 'large',
  darken = true,
  style,
}) {
  const dimensions = Dimensions.get('screen');
  return (
    <View style={{flex: 1, ...style}}>
      {loading && (
        <View
          style={{
            position: 'absolute',
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: darken
              ? variables.colorBackgroundDarken
              : 'transparent',
            alignItems: 'center',
            zIndex: 999,
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            color={variables.colorPrimary}
            size={size}
            animating={true}
            style={{flex: 1}}
          />
        </View>
      )}
      {children}
    </View>
  );
}

export default ComponentLoadingIndicator;
