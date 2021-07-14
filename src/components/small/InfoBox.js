import React from 'react';
import {View} from 'react-native';
import P from '../text/P';
import H3 from '../text/H3';
import variables from '../../util/variables';

const cardStyles = {
  backgroundColor: variables.colorCard,
  borderRadius: 25,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4,
  margin: 8,
};

function InfoBox({card, title, emoji = '🤯', children}) {
  return (
    <View
      style={[{padding: variables.getSize(28)}, card ? cardStyles : undefined]}>
      {title && (
        <View style={{marginBottom: variables.padding}}>
          <H3 style={{textAlign: 'center'}}>{title}</H3>
        </View>
      )}
      {children && (
        <View style={{marginBottom: variables.padding}}>
          {typeof children == 'string' ? <P>{children}</P> : children}
        </View>
      )}
      {emoji && (
        <View>
          <H3 style={{textAlign: 'center'}}>{emoji}</H3>
        </View>
      )}
    </View>
  );
}

export default InfoBox;
