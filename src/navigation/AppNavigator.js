import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from '../components/pages/Auth/Landing';
import AUTH_NAVIGATION from '../assets/data/enums/AuthNavigation';
import variables from '../util/variables';
import Signup from '../components/pages/Auth/Signup';
import Login from '../components/pages/Auth/Login';
import auth from '@react-native-firebase/auth';
import {View} from 'react-native';
import H1 from '../components/text/H1';
import CustomButton from '../components/small/CustomButton';

const MyTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: variables.colorWhite,
  },
};

const AuthNav = createStackNavigator();
function AppNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(undefined);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return !user ? (
    <NavigationContainer theme={MyTheme}>
      <AuthNav.Navigator
        initialRouteName={AUTH_NAVIGATION.LANDING}
        headerMode="none">
        <AuthNav.Screen name={AUTH_NAVIGATION.LANDING} component={Landing} />
        <AuthNav.Screen name={AUTH_NAVIGATION.SIGN_UP} component={Signup} />
        <AuthNav.Screen name={AUTH_NAVIGATION.LOG_IN} component={Login} />
      </AuthNav.Navigator>
    </NavigationContainer>
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <H1> Logged In</H1>
      <View style={{marginTop: 20}}>
        <CustomButton onPress={() => {}}>Logout</CustomButton>
      </View>
    </View>
  );
}

export default AppNavigator;
