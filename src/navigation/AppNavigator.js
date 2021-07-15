import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from '../components/pages/Auth/Landing';
import AUTH_NAVIGATION from '../data/enums/AuthNavigation';
import variables from '../util/variables';
import Signup from '../components/pages/Auth/Signup';
import Login from '../components/pages/Auth/Login';
import auth from '@react-native-firebase/auth';
import Home from '../components/pages/LoggedIn/Home';

const MyTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: variables.colorWhite,
  },
};

const AuthNav = createStackNavigator();

const AuthNavigation = () => (
  <NavigationContainer theme={MyTheme}>
    <AuthNav.Navigator
      initialRouteName={AUTH_NAVIGATION.LANDING}
      headerMode="none">
      <AuthNav.Screen name={AUTH_NAVIGATION.LANDING} component={Landing} />
      <AuthNav.Screen name={AUTH_NAVIGATION.SIGN_UP} component={Signup} />
      <AuthNav.Screen name={AUTH_NAVIGATION.LOG_IN} component={Login} />
    </AuthNav.Navigator>
  </NavigationContainer>
);

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

  return !user ? <AuthNavigation /> : <Home />;
}

export default AppNavigator;
