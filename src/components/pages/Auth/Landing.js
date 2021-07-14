import React from 'react';
import {View, ScrollView} from 'react-native';
import Logo from '../../../assets/icons/logo.svg';
import H1 from '../../text/H1';
import H4 from '../../text/H4';
import CustomButton from '../../small/CustomButton';
import AUTH_NAVIGATION from '../../../assets/data/enums/AuthNavigation';
function Landing({navigation, ...props}) {
  return (
    <ScrollView style={{flex: 1, paddingHorizontal: 50}}>
      <View style={{marginTop: 110, marginBottom: 50, alignItems: 'center'}}>
        <Logo />
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
        <View>
          <CustomButton
            filled
            onPress={() => navigation.navigate(AUTH_NAVIGATION.SIGN_UP)}>
            Sign up
          </CustomButton>
        </View>
      </View>
    </ScrollView>
  );
}

export default Landing;
