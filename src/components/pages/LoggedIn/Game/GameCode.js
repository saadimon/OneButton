import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import variables from '../../../../util/variables';
import H3 from '../../../text/H3';
import H4 from '../../../text/H4';
import ClipboardIcon from '../../../../assets/icons/Clipboard';
import Clipboard from '@react-native-community/clipboard';
import ALERT_TYPES from '../../../../data/enums/AlertTypes';
import Alert from '../../../../util/Alert';

function GameCode({game, showLabel}) {
  const onCopyCode = () => {
    Clipboard.setString(game?.code);
    Alert(ALERT_TYPES.INFO, 'Code copied to clipboard');
  };
  return (
    <View style={{alignItems: 'center'}}>
      {showLabel && <H4>Share this code with your friends!</H4>}
      <View
        style={{
          backgroundColor: variables.colorPurpleDark,
          paddingHorizontal: variables.getSize(27),
          paddingVertical: variables.getSize(15),
          borderRadius: variables.getSize(5),
          marginTop: variables.getSize(10),
        }}>
        <TouchableOpacity onPress={onCopyCode}>
          <View
            style={{
              backgroundColor: variables.colorPurpleMedium,
              paddingHorizontal: variables.getSize(20),
              paddingVertical: variables.getSize(12),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <H3 style={{color: variables.colorWhite}}>
              {game?.code || 'LOADNG'}
            </H3>
            <View style={{marginLeft: variables.getSize(15)}}>
              <ClipboardIcon />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default GameCode;
