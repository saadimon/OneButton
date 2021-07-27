import React from 'react';
import {View} from 'react-native';
import variables from '../../../../util/variables';
import Avatar from '../../../small/Avatar';
import P from '../../../text/P';

const ScoreItem = ({user, light}) => {
  return (
    <View
      style={{
        padding: variables.padding,
        marginVertical: variables.padding,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Avatar
        size={variables.getSize(70)}
        source={user.profilePicture ? {uri: user.profilePicture} : undefined}
      />
      <View style={{marginTop: variables.getSize(15)}}>
        <P light={light}>{user.name}</P>
      </View>
      {/* <P light>{user.gamesWon}</P> */}
    </View>
  );
};

export default ScoreItem;
