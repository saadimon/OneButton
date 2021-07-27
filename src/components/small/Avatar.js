import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import variables from '../../util/variables';
import profilePicture from '../../assets/images/profilePicture.png';

function Avatar({source, onPress, size = variables.getSize(150)}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        width={size}
        height={size}
        style={{width: size, height: size, borderRadius: size}}
        source={source ? source : profilePicture}
      />
    </TouchableOpacity>
  );
}

export default Avatar;
