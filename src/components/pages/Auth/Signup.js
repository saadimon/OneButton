import React, {useEffect, useState} from 'react';
import {Image, View, Keyboard, Platform} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import ProfileIcon from '../../../assets/icons/profile_signup.png';
import PlusIcon from '../../../assets/icons/plus_signup.svg';
import H2 from '../../text/H2';
import CustomInput from '../../small/CustomInput';
import variables from '../../../util/variables';
import InfoText from '../../text/InfoText';
import SubText from '../../text/SubText';
import CustomButton from '../../small/CustomButton';
import ScrollViewWithoutBar from '../../small/ScrollViewWithoutBar';
import AuthService from '../../../services/AuthService';
import LoadingIndicator from '../../small/LoadingIndicator';
import Alert from '../../../util/Alert';
import ALERT_TYPES from '../../../data/enums/AlertTypes';

function Signup({route}) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAgree, setTermsAgree] = useState(false);
  const [promotionAgree, setPromotionAgree] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const openListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });
    const closeListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });
    return () => {
      openListener.remove();
      closeListener.remove();
    };
  }, []);

  const onSignup = () => {
    const {setFirstLogin} = route.params;
    setFirstLogin(true);
    setLoading(true);
    AuthService.signup(email, password, userName)
      .catch(e => {
        setFirstLogin(false);
        Alert(ALERT_TYPES.ERROR, e.code);
      })
      .finally(() => setLoading(false));
  };

  return (
    <LoadingIndicator loading={loading} style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: variables.marginHorizontalAuthPages,
          paddingTop: variables.getSize(24),
        }}>
        <ScrollViewWithoutBar
          style={{
            alignSelf: 'center',
            width: '100%',
          }}>
          <H2>Sign up</H2>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 22,
            }}>
            <View>
              <Image source={ProfileIcon} />
              <PlusIcon style={{position: 'absolute', right: 0, bottom: 0}} />
            </View>
          </View>
          <View>
            <CustomInput
              style={{marginTop: 24}}
              placeholder="username"
              value={userName}
              autoCapitalize={'none'}
              onChangeText={e => setUserName(e)}
            />
            <CustomInput
              style={{marginTop: variables.padding}}
              placeholder="email"
              value={email}
              autoCapitalize={'none'}
              onChangeText={e => setEmail(e)}
              keyboardType="email-address"
            />
            <CustomInput
              style={{marginTop: variables.padding}}
              placeholder="password"
              value={password}
              autoCapitalize={'none'}
              onChangeText={e => setPassword(e)}
              secureTextEntry={true}
            />
          </View>
          <View style={{marginTop: variables.padding}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: variables.padding,
              }}>
              <CheckBox
                disabled={loading}
                tintColors={{true: '', false: '#ccc'}}
                value={termsAgree}
                onValueChange={e => setTermsAgree(e)}
                style={{marginRight: Platform.OS == 'android' ? 0 : 10}}
              />
              <SubText>
                By clicking here, you agree to our terms and services.
              </SubText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: variables.padding,
              }}>
              <CheckBox
                disabled={loading}
                tintColors={{true: '', false: '#ccc'}}
                value={promotionAgree}
                onValueChange={e => setPromotionAgree(e)}
                style={{marginRight: Platform.OS == 'android' ? 0 : 10}}
              />
              <SubText>Please send me promotional emails :)</SubText>
            </View>
            <View style={{marginVertical: variables.paddingLarge}}>
              <CustomButton onPress={onSignup} disabled={loading} filled>
                Sign up
              </CustomButton>
            </View>
          </View>
        </ScrollViewWithoutBar>
      </View>
      {!keyboardOpen && (
        <View
          style={{
            backgroundColor: variables.colorPurple,
            paddingVertical: variables.getSize(17),
            paddingHorizontal: variables.getSize(70),
          }}>
          <InfoText style={{color: variables.colorWhite, textAlign: 'center'}}>
            Join a community of over a million players worldwide! 🎮
          </InfoText>
        </View>
      )}
    </LoadingIndicator>
  );
}

export default Signup;
