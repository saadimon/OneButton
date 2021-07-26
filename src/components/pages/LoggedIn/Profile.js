import React, {useEffect, useState} from 'react';
import LoadingIndicator from '../../small/LoadingIndicator';
import H3 from '../../text/H3';
import AuthService from '../../../services/AuthService';
import H4 from '../../text/H4';
import {useIsFocused} from '@react-navigation/native';
import CustomInput from '../../small/CustomInput';
import CustomButton from '../../small/CustomButton';
import {ScrollView, View} from 'react-native';
import variables from '../../../util/variables';
import LOGGED_IN_NAVIGATION from '../../../data/enums/LoggedInNavigation';
import data from '../../../data';

function Profile({navigation}) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');

  const getUserObj = () => {
    setLoading(true);
    AuthService.getUserObj()
      .then(res => {
        if (res) {
          setUser(res);
          setUsername(res.username);
        }
      })
      .finally(() => setLoading(false));
  };

  const updateProfile = () => {
    setLoading(true);
    AuthService.updateOwnUser({name: username})
      .then(res => {
        if (res) setUser(prev => ({...prev, username, name: username}));
      })
      .finally(() => setLoading(false));
  };

  const logout = () => AuthService.logout();

  const isFocused = useIsFocused();

  useEffect(() => {
    getUserObj();
  }, [isFocused]);

  return (
    <LoadingIndicator loading={loading}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: variables.marginHorizontalAuthPages,
        }}>
        <H3>Hello, {user?.name}</H3>
        <ScrollView style={{flex: 1}}>
          <View style={{paddingTop: variables.padding, alignItems: 'center'}}>
            <H4>You have clicked {user.clicks} times!</H4>
          </View>
          <View style={{paddingTop: variables.padding, alignItems: 'center'}}>
            <H4>
              You have clicked #{data.getMostClicksForUser(user)} the most
              times!
            </H4>
          </View>
          <View style={{paddingTop: variables.padding, alignItems: 'center'}}>
            <H4>You have won {user.gamesWon || 0} times</H4>
          </View>
          <View style={{paddingTop: variables.padding}}>
            <CustomInput value={username} onChangeText={e => setUsername(e)} />
          </View>
          <View style={{paddingTop: variables.padding}}>
            <CustomButton onPress={updateProfile}>Update Profile</CustomButton>
          </View>
          <View style={{paddingTop: variables.padding}}>
            <CustomButton
              onPress={() =>
                navigation.navigate(LOGGED_IN_NAVIGATION.CHANGE_PASSWORD)
              }>
              Change Password
            </CustomButton>
          </View>
        </ScrollView>
        <View style={{marginVertical: variables.padding}}>
          <CustomButton onPress={logout}>Logout</CustomButton>
        </View>
      </View>
    </LoadingIndicator>
  );
}

export default Profile;
