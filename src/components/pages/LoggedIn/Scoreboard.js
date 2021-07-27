import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import GameService from '../../../services/GameService';
import variables from '../../../util/variables';
import Avatar from '../../small/Avatar';
import LoadingIndicator from '../../small/LoadingIndicator';
import H2 from '../../text/H2';
import H3 from '../../text/H3';
import H4 from '../../text/H4';
import P from '../../text/P';

const ScoreItem = ({user}) => {
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
        <P light>{user.name}</P>
      </View>
      {/* <P light>{user.gamesWon}</P> */}
    </View>
  );
};

function Scoreboard() {
  const [loading, setLoading] = useState(false);
  const [allTimeUsers, setAllTimeUsers] = useState([]);
  const [dailyUsers, setDailyUsers] = useState([]);
  const [weeklyUsers, setWeeklyUsers] = useState([]);
  const [monthlyUsers, setMonthlyUsers] = useState([]);

  const getHighScores = async () => {
    setLoading(true);
    const allTime = GameService.getAllTimeHighScores();
    const daily = GameService.getDailyHighScores();
    const weekly = GameService.getWeeklyHighScores();
    const monthly = GameService.getMonthlyHighScores();
    const [allTimeScores, dailyScores, weeklyScores, monthlyScores] =
      await Promise.all([allTime, daily, weekly, monthly]);
    setAllTimeUsers(allTimeScores);
    setDailyUsers(dailyScores);
    setWeeklyUsers(weeklyScores);
    setMonthlyUsers(monthlyScores);
    setLoading(false);
  };

  useEffect(() => {
    getHighScores();
  }, []);

  return (
    <>
      <LoadingIndicator loading={loading} />
      <StatusBar
        backgroundColor={variables.colorBlack}
        barStyle="light-content"
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: variables.getSize(15),
          paddingVertical: variables.marginHorizontalAuthPages,
          backgroundColor: variables.colorBlack,
        }}>
        <H2 style={{textAlign: 'center'}} light>
          Scoreboard
        </H2>
        <ScrollView>
          <View style={{marginVertical: variables.getSize(10)}}>
            <P light>Today</P>
            <ScrollView horizontal>
              {dailyUsers.map((user, index) => (
                <ScoreItem user={user} key={index} />
              ))}
            </ScrollView>
          </View>
          <View style={{marginVertical: variables.getSize(10)}}>
            <P light>This Week</P>
            <ScrollView horizontal>
              {weeklyUsers.map((user, index) => (
                <ScoreItem user={user} key={index} />
              ))}
            </ScrollView>
          </View>
          <View style={{marginVertical: variables.getSize(10)}}>
            <P light>This Month</P>
            <ScrollView horizontal>
              {monthlyUsers.map((user, index) => (
                <ScoreItem user={user} key={index} />
              ))}
            </ScrollView>
          </View>
          <View style={{marginVertical: variables.getSize(10)}}>
            <P light>All Time</P>
            <ScrollView horizontal>
              {allTimeUsers.map((user, index) => (
                <ScoreItem user={user} key={index} />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default Scoreboard;
