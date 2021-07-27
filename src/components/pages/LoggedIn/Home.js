import React, {useEffect} from 'react';
import {ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';
import LOGGED_IN_NAVIGATION from '../../../data/enums/LoggedInNavigation';
import AuthService from '../../../services/AuthService';
import variables from '../../../util/variables';
import CustomButton from '../../small/CustomButton';
import H2 from '../../text/H2';
import H3 from '../../text/H3';
import SettingsIcon from '../../../assets/icons/settings.svg';
import GameService from '../../../services/GameService';
import ScoreboardSection from './Scoreboard/ScoreboardSection';
import P from '../../text/P';
import InfoText from '../../text/InfoText';
import SubText from '../../text/SubText';
function Home({navigation, route}) {
  return (
    <View style={{flex: 1, backgroundColor: variables.colorPrimary}}>
      <StatusBar
        backgroundColor={variables.colorPrimary}
        barStyle="light-content"
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: variables.marginHorizontalAuthPages,
          paddingTop: variables.marginHorizontalAuthPages,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <H2 light>Ready to start a new game?</H2>
          </View>
          <TouchableOpacity
            style={{marginLeft: variables.getSize(10)}}
            onPress={e => navigation.navigate(LOGGED_IN_NAVIGATION.PROFILE)}>
            <SettingsIcon />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: variables.getSize(14), flex: 1}}>
                <TouchableOpacity
                  onPress={e =>
                    navigation.navigate(LOGGED_IN_NAVIGATION.SEARCH_GAMES)
                  }>
                  <View
                    style={{
                      height: variables.getSize(250),
                      flex: variables.getSize(1),
                      borderRadius: variables.getSize(10),
                      backgroundColor: variables.colorPurpleMedium,
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: variables.getSize(13),
                    }}>
                    <P light bold style={{textAlign: 'center'}}>
                      Join an existing room
                    </P>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{marginLeft: variables.getSize(14), flex: 1}}>
                <TouchableOpacity
                  onPress={e =>
                    navigation.navigate(LOGGED_IN_NAVIGATION.CREATE_GAME)
                  }>
                  <View
                    style={{
                      flex: variables.getSize(1),
                      borderRadius: variables.getSize(10),
                      backgroundColor: variables.colorPurpleMedium,
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: variables.getSize(250),
                      padding: variables.getSize(13),
                    }}>
                    <P light bold style={{textAlign: 'center'}}>
                      Start a room with my friends
                    </P>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View style={{marginTop: variables.getSize(20)}}>
                <H2 style={{textAlign: 'center'}} light>
                  Scoreboard
                </H2>
              </View>
              <ScoreboardSection
                light
                getUsers={GameService.getDailyHighScores}
                title="Today"
              />
              <TouchableOpacity
                onPress={e =>
                  navigation.navigate(LOGGED_IN_NAVIGATION.SCOREBOARD)
                }>
                <InfoText light style={{fontWeight: '700'}}>
                  See full list
                </InfoText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default Home;
