import React, {useEffect} from 'react';
import {View} from 'react-native';
import Logo from '../../../assets/icons/logo.svg';
import H1 from '../../text/H1';
import H4 from '../../text/H4';
import CustomButton from '../../small/CustomButton';
import AUTH_NAVIGATION from '../../../data/enums/AuthNavigation';
import ScrollViewWithoutBar from '../../small/ScrollViewWithoutBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Landing({navigation, ...props}) {
  useEffect(() => {
    AsyncStorage.getItem('previouslyOpened').then(previouslyOpened => {
      if (!previouslyOpened) {
        navigation.navigate(AUTH_NAVIGATION.GET_STARTED_ONE);
        AsyncStorage.setItem('previouslyOpened', 'true');
      }
    });
  }, []);

  return (
    <ScrollViewWithoutBar style={{flex: 1, paddingHorizontal: 50}}>
      <View style={{marginTop: 110, marginBottom: 50, alignItems: 'center'}}>
        <Logo width={220} height={200} />
      </View>
      <View style={{alignItems: 'center', marginBottom: 50}}>
        <H1>OneButton!</H1>
        <H4>The funnest game ever!</H4>
      </View>
      <View>
        <View style={{marginBottom: 20}}>
          <CustomButton
            onPress={() => navigation.navigate(AUTH_NAVIGATION.LOG_IN)}>
            Log in
          </CustomButton>
        </View>
        <View style={{marginBottom: 20}}>
          <CustomButton
            filled
            onPress={() => navigation.navigate(AUTH_NAVIGATION.SIGN_UP)}>
            Sign up
          </CustomButton>
        </View>
      </View>
    </ScrollViewWithoutBar>
  );
}

export default Landing;
