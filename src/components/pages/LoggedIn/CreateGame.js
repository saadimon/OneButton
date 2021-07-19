import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import ALERT_TYPES from '../../../data/enums/AlertTypes';
import LOGGED_IN_NAVIGATION from '../../../data/enums/LoggedInNavigation';
import GameService from '../../../services/GameService';
import Alert from '../../../util/Alert';
import variables from '../../../util/variables';
import CustomButton from '../../small/CustomButton';
import CustomInput from '../../small/CustomInput';
import LoadingIndicator from '../../small/LoadingIndicator';
import H2 from '../../text/H2';

function CreateGame({navigation}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const onCreate = async () => {
    if (!name) return Alert(ALERT_TYPES.ERROR, 'Enter Game Name');
    setLoading(true);
    const res = await GameService.createGame(name);
    if (res) {
      Alert(ALERT_TYPES.SUCCESS, 'Game Created');
      navigation.navigate(LOGGED_IN_NAVIGATION.IN_GAME, {gameId: res});
    } else {
      Alert(ALERT_TYPES.ERROR, 'Game Not Created');
    }
    setLoading(false);
  };

  return (
    <LoadingIndicator loading={loading}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: variables.marginHorizontalAuthPages,
        }}>
        <H2>Create Game</H2>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={{marginBottom: variables.padding}}>
            <CustomInput
              value={name}
              onChangeText={e => setName(e)}
              placeholder="Your game's name"
            />
          </View>
          <View>
            <CustomButton onPress={onCreate}>Create Game</CustomButton>
          </View>
        </ScrollView>
      </View>
    </LoadingIndicator>
  );
}

export default CreateGame;
