import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import GameService from '../../../services/GameService';
import variables from '../../../util/variables';
import LoadingIndicator from '../../small/LoadingIndicator';
import H3 from '../../text/H3';
import H2 from '../../text/H2';
import H4 from '../../text/H4';
import LOGGED_IN_NAVIGATION from '../../../data/enums/LoggedInNavigation';
import Alert from '../../../util/Alert';
import ALERT_TYPES from '../../../data/enums/AlertTypes';
import AuthService from '../../../services/AuthService';
import CustomInput from '../../small/CustomInput';
import CustomButton from '../../small/CustomButton';

function SearchGames({navigation}) {
  const [loading, setLoading] = useState(false);
  const [gameCode, setGameCode] = useState('');

  const onJoinGame = async game => {
    setLoading(true);
    const res = await GameService.joinGame(game.id);
    if (res) {
      navigation.navigate(LOGGED_IN_NAVIGATION.IN_GAME, {gameId: game.id});
    } else {
      Alert(ALERT_TYPES.ERROR, 'Unable to join game');
    }
    setLoading(false);
  };

  const onEnterGame = game => {
    navigation.navigate(LOGGED_IN_NAVIGATION.IN_GAME, {gameId: game.id});
  };

  const onEnterCode = () => {
    if (gameCode.length == 6)
      GameService.findGameFromCode(gameCode)
        .then(game => {
          if (game) {
            if (game.players?.includes(AuthService.getOwnUid()))
              onEnterGame(game);
            else onJoinGame(game);
          } else Alert(ALERT_TYPES.ERROR, 'Game not found!');
        })
        .finally(() => setGameCode(''));
    else Alert(ALERT_TYPES.ERROR, 'Invalid Code');
  };

  return (
    <>
      <LoadingIndicator loading={loading} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: variables.marginHorizontalAuthPages,
          paddingVertical: variables.marginHorizontalAuthPages,
          backgroundColor: variables.colorPrimary,
          justifyContent: 'space-between',
        }}>
        <H2 light style={{textAlign: 'center'}}>
          Join Game
        </H2>
        <CustomInput
          light
          caretHidden
          style={{textAlign: 'center'}}
          value={gameCode}
          placeholder="Enter Code"
          onChangeText={e => setGameCode(e)}
        />
        <CustomButton onPress={onEnterCode}>Join</CustomButton>
      </View>
    </>
  );
}

export default SearchGames;
