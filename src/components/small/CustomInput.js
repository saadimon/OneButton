import React from 'react';
import {TextInput} from 'react-native';
import variables from '../../util/variables';

import {defaultH4Styles} from '../text/H4';

function CustomInput({style, ...props}) {
  return (
    <TextInput
      style={{
        borderWidth: 2,
        borderColor: variables.colorPrimary,
        borderRadius: 100,
        paddingHorizontal: 25,
        color: variables.colorPrimary,
        ...defaultH4Styles,
        ...style,
      }}
      placeholderTextColor={variables.colorPrimary}
      {...props}
    />
  );
}

export default CustomInput;
