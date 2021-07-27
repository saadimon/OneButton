import React from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import GameService from '../../../../services/GameService';
import variables from '../../../../util/variables';
import H2 from '../../../text/H2';
import ScoreboardSection from './ScoreboardSection';

function Scoreboard() {
  return (
    <>
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
          <ScoreboardSection
            light
            getUsers={GameService.getDailyHighScores}
            title={'Today'}
          />
          <ScoreboardSection
            light
            getUsers={GameService.getWeeklyHighScores}
            title={'This week'}
          />
          <ScoreboardSection
            light
            getUsers={GameService.getMonthlyHighScores}
            title={'This month'}
          />
          <ScoreboardSection
            light
            getUsers={GameService.getAllTimeHighScores}
            title={'All Time'}
          />
        </ScrollView>
      </View>
    </>
  );
}

export default Scoreboard;
