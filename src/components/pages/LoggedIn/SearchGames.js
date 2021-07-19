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

function SearchGames({navigation}) {
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);

  const getActiveGames = async () => {
    setLoading(true);
    const games = await GameService.getActiveGames();
    setGames(games);
    setLoading(false);
  };

  useEffect(() => {
    getActiveGames();
  }, []);

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

  return (
    <LoadingIndicator loading={loading}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: variables.marginHorizontalAuthPages,
        }}>
        <H2>Search Games</H2>
        <View style={{flex: 1}}>
          <ScrollView
            style={{
              marginTop: variables.padding,
            }}>
            {games.map((game, index) => {
              const joined = game.players.includes(AuthService.getOwnUid());
              return (
                <View
                  style={{
                    paddingVertical: variables.getSize(50),
                    paddingHorizontal: variables.getSize(12),
                    borderWidth: 2,
                    borderRadius: 5,
                    alignItems: 'center',
                    marginBottom: variables.padding,
                  }}
                  key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 1}}>
                      <H3 style={{textAlign: 'center'}}>{game.name}</H3>
                    </View>
                    <TouchableOpacity
                      onPress={e =>
                        joined ? onEnterGame(game) : onJoinGame(game)
                      }>
                      <View
                        style={{
                          borderRadius: 5,
                          borderWidth: 2,
                          paddingHorizontal: variables.getSize(12),
                          paddingVertical: variables.getSize(12),
                        }}>
                        <H4>{joined ? 'Enter' : 'Join Game'}</H4>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </LoadingIndicator>
  );
}

export default SearchGames;
