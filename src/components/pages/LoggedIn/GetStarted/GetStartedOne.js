import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import LOGGED_IN_NAVIGATION from '../../../../data/enums/LoggedInNavigation';
import variables from '../../../../util/variables';
import InfoBox from '../../../small/InfoBox';
import H3 from '../../../text/H3';
import ChevronRight from '../../../../assets/icons/ChevronRight.svg';
function GetStartedOne({navigation}) {
  const goHome = () => navigation.navigate(LOGGED_IN_NAVIGATION.HOME);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: variables.marginHorizontalAuthPages,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: variables.getSize(50),
        }}>
        <View style={{flex: 1}}>
          <H3>Let's get started!</H3>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
          }}>
          <InfoBox title="Did you know?">
            The original name for the search engine Google was Backrub. It was
            renamed Google after the googol, which is the number one followed by
            100 zeros.
          </InfoBox>
          <InfoBox title="Did you know?">
            The original name for the search engine Google was Backrub. It was
            renamed Google after the googol, which is the number one followed by
            100 zeros.
          </InfoBox>
        </ScrollView>
      </View>
      <View
        style={{
          marginVertical: variables.getSize(40),
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity onPress={goHome}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: variables.getSize(45),
            }}>
            <H3>Next</H3>
            <View
              style={{
                backgroundColor: '#c4c4c4',
                borderRadius: 100,
                width: variables.getSize(45),
                height: variables.getSize(45),
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: variables.getSize(22),
              }}>
              <ChevronRight />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default GetStartedOne;
