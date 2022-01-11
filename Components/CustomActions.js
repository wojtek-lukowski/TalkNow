import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const firebase = require('firebase');
require('firebase/firestore');

export default class CustomActions extends React.Component {

  constructor(props) {
    super(props);
  }

  onActionPress = () => {
    const options = ['Choose photo from your gallery', 'Take picture', 'Send your location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('take a pic from gallery');
            return this.pickImage();
          case 1:
            console.log('take a new pic');
            return this.takePhoto();
          case 2:
            console.log('send location');
            return this.getLocation();
          default:
        }
      },
    );
  }

  getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    try {
      if (status === 'granted') {
        let result = await Location.getCurrentPositionAsync({})
        .catch((error) => {
        });
        if (result) {
          this.props.onSend({
            location: {
              longitude: result.coords.longitude,
              latitude: result.coords.latitude,
            }
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      }).catch(error => console.log(error));

      if(!result.cancelled) {
        const imageUrl = await this.uploadImage(result.uri);
          this.props.onSend({ image: imageUrl });
      }
    }
  }

  takePhoto = async() => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if(status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
      }).catch(error => console.log(error));

      if (!result.cancelled) {
        const imageUrl = await this.uploadImage(result.uri);
        this.props.onSend({ image: imageUrl });
        }
    }
  }

  uploadImage = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`);

    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  render() {
    return(
      <TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
        <View style={[styles.customActionsButton, {borderColor: this.props.color}]}>
        <Text style={[styles.text, {color: this.props.color}]}>+</Text>
        </View>
      </TouchableOpacity>
    )};
}

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
  };

const styles = StyleSheet.create({
    container: {
      width: 32,
      height: 32,
      marginLeft: 8,
      marginRight: 4,
      marginBottom: 4,
    },
    customActionsButton: {
      flex: 1,
      borderStyle: 'solid',
      borderWidth: 3,
      borderRadius: 50,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
    }
  });