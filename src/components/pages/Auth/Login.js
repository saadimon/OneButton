import React, {useState} from 'react';
import {View} from 'react-native';
import ALERT_TYPES from '../../../data/enums/AlertTypes';
import {AuthService} from '../../../services/AuthService';
import Alert from '../../../util/Alert';
import variables from '../../../util/variables';
import CustomButton from '../../small/CustomButton';
import CustomInput from '../../small/CustomInput';
import InfoBox from '../../small/InfoBox';
import LoadingIndicator from '../../small/LoadingIndicator';
import ScrollViewWithoutBar from '../../small/ScrollViewWithoutBar';
import H2 from '../../text/H2';
import H4 from '../../text/H4';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const onLogin = () => {
    setLoading(true);
    AuthService.login(email, password)
      .catch(e => Alert(ALERT_TYPES.ERROR, e))
      .finally(() => setLoading(false));
  };

  return (
    <LoadingIndicator
      loading={loading}
      style={{
        paddingHorizontal: variables.marginHorizontalAuthPages,
        marginTop: variables.getSize(24),
        flex: 1,
      }}>
      <H2>Login</H2>
      <ScrollViewWithoutBar>
        <View style={{marginTop: variables.getSize(60)}}>
          <View>
            <View style={{marginBottom: variables.padding}}>
              <CustomInput
                placeholder="email or username"
                value={email}
                onChangeText={e => setEmail(e)}
                autocapitalize={false}
                keyboardType="email-address"
              />
            </View>
            <View style={{marginBottom: variables.padding}}>
              <CustomInput
                placeholder="password"
                secureTextEntry={true}
                value={password}
                onChangeText={e => setPassword(e)}
              />
            </View>
            <View style={{marginBottom: variables.padding}}>
              <CustomButton onPress={onLogin} filled>
                Log in
              </CustomButton>
            </View>
          </View>
          <View style={{marginTop: variables.getSize(70)}}>
            <H4>🌎 187,923 users are live right now!</H4>
          </View>
          <View
            style={{
              marginTop: variables.getSize(35),
              marginBottom: variables.padding,
            }}>
            <InfoBox card title="Did you know?">
              The original name for the search engine Google was Backrub. It was
              renamed Google after the googol, which is the number one followed
              by 100 zeros.
            </InfoBox>
          </View>
        </View>
      </ScrollViewWithoutBar>
    </LoadingIndicator>
  );
}

export default Login;
