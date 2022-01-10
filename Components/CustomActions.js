import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            return;
          case 1:
            console.log('take a new pic');
            return;
          case 2:
            console.log('send location');
            default:
        }
      },
    );
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