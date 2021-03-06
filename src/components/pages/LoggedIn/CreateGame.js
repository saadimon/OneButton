import randomatic from 'randomatic';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import ALERT_TYPES from '../../../data/enums/AlertTypes';
import LOGGED_IN_NAVIGATION from '../../../data/enums/LoggedInNavigation';
import GameService from '../../../services/GameService';
import Alert from '../../../util/Alert';
import variables from '../../../util/variables';
import CustomButton from '../../small/CustomButton';
import CustomInput from '../../small/CustomInput';
import LoadingIndicator from '../../small/LoadingIndicator';
import H2 from '../../text/H2';
import H3 from '../../text/H3';
import GameCode from './Game/GameCode';

function CreateGame({navigation}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(randomatic(10));

  const [game, setGame] = useState(undefined);

  const onCreate = async () => {
    if (!name) return Alert(ALERT_TYPES.ERROR, 'Enter Game Name');
    setLoading(true);
    const gameId = await GameService.createGame(name);
    if (gameId) {
      const game = await GameService.getGame(gameId);
      setGame(game);
      Alert(ALERT_TYPES.SUCCESS, 'Game Created');
    } else {
      Alert(ALERT_TYPES.ERROR, 'Error creating game');
      navigation.goBack();
    }
    setLoading(false);
  };

  const onEnterGame = () => {
    if (game)
      navigation.navigate(LOGGED_IN_NAVIGATION.IN_GAME, {gameId: game?.id});
  };

  useEffect(() => {
    onCreate();
  }, []);

  return (
    <>
      <LoadingIndicator loading={loading} />
      <View
        style={{
          flex: 1,
          paddingVertical: variables.marginHorizontalAuthPages,
          paddingHorizontal: variables.marginHorizontalAuthPages,
          backgroundColor: variables.colorPrimary,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <H2 style={{textAlign: 'center'}} light>
          Share this code with your friends
        </H2>
        <GameCode game={game} />
        <View>
          <H3 light>...or send them a text</H3>
        </View>
        <View>
          <H2 light>...or go live!</H2>
        </View>
        <View>
          <CustomButton onPress={onEnterGame}>Enter Game</CustomButton>
        </View>
        {/* <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={{marginBottom: variables.padding}}>
            <CustomInput
              value={name}
              onChangeText={e => setName(e)}
              placeholder="Your game's name"
            />
          </View>
          <View>
            <CustomButton onPress={onCreate}>Create Game</CustomButton>
          </View>
        </ScrollView> */}
      </View>
    </>
  );
}

export default CreateGame;
