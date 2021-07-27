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
import LOGGED_IN_NAVIGATION from '../data/enums/LoggedInNavigation';
import SearchGames from '../components/pages/LoggedIn/SearchGames';
import CreateGame from '../components/pages/LoggedIn/CreateGame';
import InGame from '../components/pages/LoggedIn/InGame';
import Profile from '../components/pages/LoggedIn/Profile';
import UpdatePassword from '../components/pages/LoggedIn/UpdatePassword';
import Scoreboard from '../components/pages/LoggedIn/Scoreboard';
import GetStartedOne from '../components/pages/LoggedIn/GetStarted/GetStartedOne';
import GetStartedTwo from '../components/pages/LoggedIn/GetStarted/GetStartedTwo';

const MyTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: variables.colorWhite,
  },
};

const AuthNav = createStackNavigator();
const LoggedInNav = createStackNavigator();

const AuthNavigation = () => (
  <NavigationContainer theme={MyTheme}>
    <AuthNav.Navigator
      initialRouteName={AUTH_NAVIGATION.LANDING}
      headerMode="none">
      <AuthNav.Screen name={AUTH_NAVIGATION.LANDING} component={Landing} />
      <AuthNav.Screen name={AUTH_NAVIGATION.SIGN_UP} component={Signup} />
      <AuthNav.Screen name={AUTH_NAVIGATION.LOG_IN} component={Login} />
      <AuthNav.Screen
        name={AUTH_NAVIGATION.GET_STARTED_ONE}
        component={GetStartedOne}
      />
      <AuthNav.Screen
        name={AUTH_NAVIGATION.GET_STARTED_TWO}
        component={GetStartedTwo}
      />
    </AuthNav.Navigator>
  </NavigationContainer>
);

const LoggedInNavigation = () => (
  <NavigationContainer theme={MyTheme}>
    <LoggedInNav.Navigator
      initialRouteName={LOGGED_IN_NAVIGATION.HOME}
      headerMode="none">
      <LoggedInNav.Screen name={LOGGED_IN_NAVIGATION.HOME} component={Home} />
      <LoggedInNav.Screen
        name={LOGGED_IN_NAVIGATION.SEARCH_GAMES}
        component={SearchGames}
      />
      <LoggedInNav.Screen
        name={LOGGED_IN_NAVIGATION.CREATE_GAME}
        component={CreateGame}
      />
      <LoggedInNav.Screen
        name={LOGGED_IN_NAVIGATION.IN_GAME}
        component={InGame}
      />
      <LoggedInNav.Screen
        name={LOGGED_IN_NAVIGATION.PROFILE}
        component={Profile}
      />
      <LoggedInNav.Screen
        name={LOGGED_IN_NAVIGATION.CHANGE_PASSWORD}
        component={UpdatePassword}
      />
      <LoggedInNav.Screen
        name={LOGGED_IN_NAVIGATION.SCOREBOARD}
        component={Scoreboard}
      />
    </LoggedInNav.Navigator>
  </NavigationContainer>
);

function AppNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  if (initializing) return null;

  return !user ? <AuthNavigation /> : <LoggedInNavigation />;
}

export default AppNavigator;
