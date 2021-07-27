import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import GameService from '../../../services/GameService';
import variables from '../../../util/variables';
import LoadingIndicator from '../../small/LoadingIndicator';
import H3 from '../../text/H3';
import H4 from '../../text/H4';
import P from '../../text/P';

const ScoreItem = ({user}) => {
  return (
    <View
      style={{
        padding: variables.padding,
        marginVertical: variables.padding,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <P>{user.name}</P>
      <P>{user.gamesWon}</P>
    </View>
  );
};

function Scoreboard() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getHighScores = () => {
    setLoading(true);
    GameService.getHighScores()
      .then(res => setUsers(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getHighScores();
  }, []);

  return (
    <>
      <LoadingIndicator loading={loading} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: variables.marginHorizontalAuthPages,
        }}>
        <H3>Scoreboard</H3>
        <ScrollView style={{flex: 1}}>
          <View
            style={{
              padding: variables.padding,
              marginVertical: variables.padding,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <H4 style={{fontWeight: '700'}}>User</H4>
            <H4 style={{fontWeight: '700'}}>Wins</H4>
          </View>
          {users.map((user, index) => (
            <ScoreItem user={user} key={index} />
          ))}
        </ScrollView>
      </View>
    </>
  );
}

export default Scoreboard;
