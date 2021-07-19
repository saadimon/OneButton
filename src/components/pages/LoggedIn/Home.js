import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import LOGGED_IN_NAVIGATION from '../../../data/enums/LoggedInNavigation';
import AuthService from '../../../services/AuthService';
import variables from '../../../util/variables';
import CustomButton from '../../small/CustomButton';
import H2 from '../../text/H2';
import H3 from '../../text/H3';
import SettingsIcon from '../../../assets/icons/settings.svg';
function Home({navigation}) {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: variables.marginHorizontalAuthPages,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <H2>Home</H2>
          </View>
          <TouchableOpacity
            onPress={e => navigation.navigate(LOGGED_IN_NAVIGATION.PROFILE)}>
            <SettingsIcon />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
            <View>
              <TouchableOpacity
                onPress={e =>
                  navigation.navigate(LOGGED_IN_NAVIGATION.CREATE_GAME)
                }>
                <View
                  style={{
                    paddingVertical: variables.getSize(50),
                    borderWidth: 2,
                    borderRadius: 5,
                    alignItems: 'center',
                  }}>
                  <H3>Create Game</H3>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: variables.padding}}>
              <TouchableOpacity
                onPress={e =>
                  navigation.navigate(LOGGED_IN_NAVIGATION.SEARCH_GAMES)
                }>
                <View
                  style={{
                    paddingVertical: variables.getSize(50),
                    borderWidth: 2,
                    borderRadius: 5,
                    alignItems: 'center',
                  }}>
                  <H3>Search Games</H3>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: variables.padding}}>
              <TouchableOpacity
                onPress={e =>
                  navigation.navigate(LOGGED_IN_NAVIGATION.SCOREBOARD)
                }>
                <View
                  style={{
                    paddingVertical: variables.getSize(50),
                    borderWidth: 2,
                    borderRadius: 5,
                    alignItems: 'center',
                  }}>
                  <H3>Scoreboard</H3>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View style={{marginVertical: variables.getSize(15)}}>
          {/* <CustomButton
            onPress={() => {
              AuthService.logout();
            }}>
            Logout
          </CustomButton> */}
        </View>
      </View>
    </View>
  );
}

export default Home;
