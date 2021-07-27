import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import GameService from '../../../services/GameService';
import LoadingIndicator from '../../small/LoadingIndicator';
import firestore from '@react-native-firebase/firestore';
import variables from '../../../util/variables';
import H2 from '../../text/H2';
import GameButton from '../../small/GameButton';
import BUTTON_RESPONSE from '../../../data/enums/ButtonResponse';
import Alert from '../../../util/Alert';
import ALERT_TYPES from '../../../data/enums/AlertTypes';
import H3 from '../../text/H3';
import H4 from '../../text/H4';
import clipboard from '@react-native-community/clipboard';
import ClipboardIcon from '../../../assets/icons/Clipboard';
import ComponentLoadingIndicator from '../../small/ComponentLoadingIndicator';
import AuthService from '../../../services/AuthService';

function InGame({navigation, route}) {
  const gameId = route.params.gameId;
  if (!gameId) navigation.goBack();

  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState(undefined);

  useEffect(() => {
    const unsub = firestore()
      .collection('Games')
      .doc(gameId)
      .onSnapshot(snap => {
        setGame(snap.data());
      });
    return unsub;
  }, []);

  const onButtonPress = async () => {
    if (loading) return;
    if (game.count < 100) {
      setLoading(true);
      try {
        const res = await GameService.buttonClick(gameId);
        switch (res) {
          case BUTTON_RESPONSE.GAME_WIN:
            Alert(ALERT_TYPES.SUCCESS, 'You won the game!!');
            break;
          case BUTTON_RESPONSE.TOO_LATE:
            Alert(ALERT_TYPES.WARNING, 'Too late, game is already over :(');
            break;
        }
      } catch (e) {
        console.log(e);
        Alert(ALERT_TYPES.ERROR, 'Something went wrong :/');
      }
      setLoading(false);
    }
  };

  const onCopyCode = () => {
    clipboard.setString(game?.code);
    Alert(ALERT_TYPES.INFO, 'Code copied to clipboard');
  };

  return (
    <>
      <LoadingIndicator loading={loading || !game} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: variables.marginHorizontalAuthPages,
          paddingVertical: variables.marginHorizontalAuthPages,
        }}>
        <H2 style={{textAlign: 'center'}}>{game?.name}</H2>
        <View style={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={{marginVertical: variables.padding}}>
            <H2 style={{textAlign: 'center'}}>
              {game?.count < 100 ? (
                game.count
              ) : game ? (
                game.winner == AuthService.getOwnUid() ? (
                  '🎉 You Win! 🎉'
                ) : (
                  '😞 You were too late 😞'
                )
              ) : (
                <ComponentLoadingIndicator />
              )}
            </H2>
          </View>
          <GameButton onPress={onButtonPress} />
        </View>
        <View style={{alignItems: 'center'}}>
          <H4>Share this code with your friends!</H4>
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
                  {game?.code || 'NOCODE'}
                </H3>
                <View style={{marginLeft: variables.getSize(15)}}>
                  <ClipboardIcon />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export default InGame;
