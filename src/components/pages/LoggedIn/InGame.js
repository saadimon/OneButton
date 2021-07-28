import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import GameService from '../../../services/GameService';
import LoadingIndicator from '../../small/LoadingIndicator';
import firestore from '@react-native-firebase/firestore';
import variables from '../../../util/variables';
import H2 from '../../text/H2';
import GameButton from '../../small/GameButton';
import BUTTON_RESPONSE from '../../../data/enums/ButtonResponse';
import Alert from '../../../util/Alert';
import ALERT_TYPES from '../../../data/enums/AlertTypes';
import ComponentLoadingIndicator from '../../small/ComponentLoadingIndicator';
import AuthService from '../../../services/AuthService';
import GameCode from './Game/GameCode';

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

  return (
    <>
      <LoadingIndicator loading={loading || !game} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: variables.marginHorizontalAuthPages,
          paddingVertical: variables.marginHorizontalAuthPages,
        }}>
        {/* <H2 style={{textAlign: 'center'}}>{game?.name}</H2> */}
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
        <GameCode showLabel game={game} />
      </View>
    </>
  );
}

export default InGame;
