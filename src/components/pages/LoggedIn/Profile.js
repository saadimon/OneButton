import React, {useEffect, useState} from 'react';
import LoadingIndicator from '../../small/LoadingIndicator';
import H3 from '../../text/H3';
import AuthService from '../../../services/AuthService';
import H4 from '../../text/H4';
import {useIsFocused} from '@react-navigation/native';
import CustomInput from '../../small/CustomInput';
import CustomButton from '../../small/CustomButton';
import {Modal, ScrollView, View} from 'react-native';
import variables from '../../../util/variables';
import LOGGED_IN_NAVIGATION from '../../../data/enums/LoggedInNavigation';
import data from '../../../data';
import Avatar from '../../small/Avatar';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Alert from '../../../util/Alert';
import ALERT_TYPES from '../../../data/enums/AlertTypes';

const imagePickerOptions = {
  maxWidth: 250,
  maxHeight: 250,
  mediaType: 'photo',
  quality: 0.5,
  includeBase64: false,
  saveToPhotos: false,
};

function Profile({navigation}) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [changePictureModalVisible, setChangePictureModalVisible] =
    useState(false);
  const getUserObj = () => {
    setLoading(true);
    AuthService.getUserObj()
      .then(res => {
        if (res) {
          setUser(res);
          setUsername(res.username);
        }
      })
      .finally(() => setLoading(false));
  };

  const updateProfile = () => {
    setLoading(true);
    AuthService.updateUser({name: username})
      .then(res => {
        if (res) {
          setUser(prev => ({...prev, username, name: username}));
        } else Alert(ALERT_TYPES.ERROR);
      })
      .finally(() => setLoading(false));
  };

  const logout = () => AuthService.logout();

  const isFocused = useIsFocused();

  useEffect(() => {
    getUserObj();
  }, [isFocused]);

  const onProfilePictureClick = () => {
    setChangePictureModalVisible(true);
  };

  const onUploadFromGallery = () => {
    setChangePictureModalVisible(false);
    launchImageLibrary(imagePickerOptions, res => {
      if (res.didCancel) return;
      if (res.errorCode) {
        console.log(res.errorCode, res.errorMessage);
        Alert(ALERT_TYPES.ERROR);
        return;
      }
      const image = res.assets[0];
      updateProfilePicture(image);
    });
  };

  const onUploadFromCamera = () => {
    setChangePictureModalVisible(false);
    launchCamera(imagePickerOptions, res => {
      if (res.didCancel) return;
      if (res.errorCode) {
        console.log(res.errorCode, res.errorMessage);
        Alert(ALERT_TYPES.ERROR);
        return;
      }
      const image = res.assets[0];
      updateProfilePicture(image);
    });
  };

  const updateProfilePicture = async image => {
    setLoading(true);
    const res = await AuthService.updateProfilePicture(image.uri);
    setLoading(false);
    if (res) {
      setUser(prev => ({...prev, profilePicture: res}));
      Alert(ALERT_TYPES.SUCCESS, 'Image updated!');
    } else Alert(ALERT_TYPES.ERROR);
  };

  return (
    <>
      <LoadingIndicator loading={loading} />
      <Modal
        visible={changePictureModalVisible}
        transparent={true}
        onRequestClose={e => setChangePictureModalVisible(false)}
        animationType="slide"
        statusBarTranslucent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: variables.colorBackgroundDarken,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: variables.modalViewWidth,
              padding: variables.paddingLarge,
              backgroundColor: variables.colorCard,
              borderRadius: variables.getSize(20),
            }}>
            <View style={{marginVertical: variables.getSize(3)}}>
              <CustomButton onPress={onUploadFromCamera} noHPadding>
                Upload From Camera
              </CustomButton>
            </View>
            <View style={{marginVertical: variables.getSize(3)}}>
              <CustomButton onPress={onUploadFromGallery} noHPadding>
                Upload From Gallery
              </CustomButton>
            </View>
            <View style={{marginVertical: variables.getSize(3)}}>
              <CustomButton
                filled
                noHPadding
                onPress={e => setChangePictureModalVisible(false)}>
                Cancel
              </CustomButton>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flex: 1,
          paddingHorizontal: variables.marginHorizontalAuthPages,
          paddingVertical: variables.marginHorizontalAuthPages,
        }}>
        <H3>Hello, {user?.name}</H3>
        <ScrollView style={{flex: 1}}>
          <View style={{paddingTop: variables.padding, alignItems: 'center'}}>
            <Avatar
              onPress={onProfilePictureClick}
              source={
                user?.profilePicture ? {uri: user.profilePicture} : undefined
              }
            />
          </View>
          <View style={{paddingTop: variables.padding, alignItems: 'center'}}>
            <H4>You have clicked {user.clicks} times!</H4>
          </View>
          <View style={{paddingTop: variables.padding, alignItems: 'center'}}>
            <H4>
              You have clicked #{data.getMostClicksForUser(user)} the most
              times!
            </H4>
          </View>
          <View style={{paddingTop: variables.padding, alignItems: 'center'}}>
            <H4>You have won {user.gamesWon || 0} times</H4>
          </View>
          <View style={{paddingTop: variables.padding}}>
            <CustomInput value={username} onChangeText={e => setUsername(e)} />
          </View>
          <View style={{paddingTop: variables.padding}}>
            <CustomButton onPress={updateProfile}>Update Profile</CustomButton>
          </View>
          <View style={{paddingTop: variables.padding}}>
            <CustomButton
              onPress={() =>
                navigation.navigate(LOGGED_IN_NAVIGATION.CHANGE_PASSWORD)
              }>
              Change Password
            </CustomButton>
          </View>
        </ScrollView>
        <View style={{marginVertical: variables.padding}}>
          <CustomButton onPress={logout}>Logout</CustomButton>
        </View>
      </View>
    </>
  );
}

export default Profile;
