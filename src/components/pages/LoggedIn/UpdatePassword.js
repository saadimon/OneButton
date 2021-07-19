import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import ALERT_TYPES from '../../../data/enums/AlertTypes';
import AuthService from '../../../services/AuthService';
import Alert from '../../../util/Alert';
import variables from '../../../util/variables';
import CustomButton from '../../small/CustomButton';
import CustomInput from '../../small/CustomInput';
import LoadingIndicator from '../../small/LoadingIndicator';
import H2 from '../../text/H2';
import H3 from '../../text/H3';
import H4 from '../../text/H4';

function UpdatePassword({navigation}) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  const onPasswordUpdate = () => {
    if (!password) return Alert(ALERT_TYPES.ERROR, 'Enter current password');
    if (newPass.length < 8)
      return Alert(
        ALERT_TYPES.ERROR,
        'Password length must be more than 8 characters',
      );
    if (newPass !== confirmNewPass)
      return Alert(ALERT_TYPES.ERROR, 'Passwords do not match');
    setLoading(true);
    AuthService.updatePassword(password, newPass)
      .then(res => {
        navigation.goBack();
        Alert(ALERT_TYPES.SUCCESS, 'Password Updated');
      })
      .catch(e => Alert(ALERT_TYPES.ERROR, e))
      .finally(() => setLoading(false));
  };

  return (
    <LoadingIndicator loading={loading}>
      <View
        style={{
          paddingHorizontal: variables.marginHorizontalAuthPages,
          flex: 1,
          justifyContent: 'center',
        }}>
        <H3>Change Password</H3>
        <ScrollView>
          <View>
            <H4>Enter current password</H4>
            <CustomInput
              value={password}
              onChangeText={e => setPassword(e)}
              secureTextEntry
            />
          </View>
          <View>
            <H4>Enter new password</H4>
            <CustomInput
              value={newPass}
              onChangeText={e => setNewPass(e)}
              secureTextEntry
            />
          </View>
          <View>
            <H4>Enter new password</H4>
            <CustomInput
              value={confirmNewPass}
              onChangeText={e => setConfirmNewPass(e)}
              secureTextEntry
            />
          </View>
          <View style={{paddingTop: variables.padding}}>
            <CustomButton onPress={onPasswordUpdate}>
              Update Password
            </CustomButton>
          </View>
        </ScrollView>
      </View>
    </LoadingIndicator>
  );
}

export default UpdatePassword;
