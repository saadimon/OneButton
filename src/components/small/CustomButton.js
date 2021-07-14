import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import variables from '../../util/variables';
import ButtonText from '../text/ButtonText';

// const shadowStyles = {
//   shadowColor: variables.colorPrimary,
//   shadowOffset: {
//     width: 0,
//     height: 8,
//   },
//   shadowOpacity: 0.44,
//   shadowRadius: 10.32,
//   elevation: 16,
// };

function CustomButton({
  children,
  onPress,
  onLongPress,
  style,
  filled,
  bottomShadow,
  ...props
}) {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} {...props}>
      <View
        style={{
          paddingHorizontal: variables.getSize(85),
          paddingVertical: variables.getSize(15),
          borderRadius: variables.getSize(40),
          alignItems: 'center',
          borderWidth: 2,
          borderColor: variables.colorPrimary,
          backgroundColor: filled
            ? variables.colorPrimary
            : variables.colorWhite,
          ...style,
        }}>
        {typeof children == 'string' ? (
          <ButtonText buttonFilled={filled}>{children}</ButtonText>
        ) : (
          children
        )}
      </View>
    </TouchableOpacity>
  );
}

export default CustomButton;
