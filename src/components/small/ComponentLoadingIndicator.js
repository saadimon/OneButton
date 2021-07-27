import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import variables from '../../util/variables';

function ComponentLoadingIndicator({
  children,
  loading,
  size = 'large',
  darken = true,
  style,
}) {
  return (
    <View style={{flex: 1, ...style}}>
      {loading && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            flex: 1,
            backgroundColor: darken
              ? variables.colorBackgroundDarken
              : 'transparent',
            alignItems: 'center',
            zIndex: 2,
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
