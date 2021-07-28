import React from 'react';
import {Platform, TextInput} from 'react-native';
import variables from '../../util/variables';

import {defaultH4Styles} from '../text/H4';

function CustomInput({style, light, ...props}) {
  return (
    <TextInput
      style={{
        borderWidth: 2,
        borderColor: light ? variables.colorWhite : variables.colorPrimary,
        borderRadius: 100,
        paddingHorizontal: 25,
        paddingVertical: 15,
        color: light ? variables.colorWhite : variables.colorPrimary,
        ...defaultH4Styles,
        ...style,
      }}
      placeholderTextColor={
        light ? variables.colorWhite : variables.colorPrimary
      }
      {...props}
    />
  );
}

export default CustomInput;
