import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import AuthService from '../../../services/AuthService';
import variables from '../../../util/variables';
import CustomButton from '../../small/CustomButton';
import H1 from '../../text/H1';
import H2 from '../../text/H2';

const GameButton = () => {
  const [count, setCount] = useState(Math.floor(Math.random() * 99));

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev < 99) return prev + 1;
        else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const size = Dimensions.get('window').width * 0.8;
  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <H1>{count < 100 ? count : '🎉 You Win! 🎉'}</H1>
      </View>

      <TouchableOpacity
        onPress={count < 100 ? () => setCount(count + 1) : undefined}
        disabled={count > 99}>
        <View
          style={{
            borderRadius: variables.getSize(9999),
            backgroundColor: '#2A005F',
            width: size,
            height: size,
          }}>
          <View
            style={{
              margin: variables.getSize(32),
              backgroundColor: '#3D008A',
              borderRadius: variables.getSize(9999),
              flex: 1,
            }}></View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
function Home() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <GameButton />
      <H1> Logged In</H1>
      <View style={{marginTop: 20}}>
        <CustomButton
          onPress={() => {
            AuthService.logout();
          }}>
          Logout
        </CustomButton>
      </View>
    </View>
  );
}

export default Home;
