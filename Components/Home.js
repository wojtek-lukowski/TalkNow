import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground } from 'react-native';

const image = require('../Images/bcg-img.png');
export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  // onPress() {
  //  (username) => this.setState({ username: username });
  //   this.props.navigation.navigate('Chat');
  // }

  render() {
    console.log(this.state);

  return (
    <View style={styles.home}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.welcome}>TalkNow</Text>
      <View style={styles.box}>
      <TextInput
      style={styles.input}
      placeholder="Enter your name"
      onChangeText={ (username) => this.setState({ username: username }) }
      defaultValue={this.state.username}
      ></TextInput>
      <Button title="Enter the chat"
      style={styles.button}
      // onPress={ this.onPress }
      // onPress={ (username) => this.setState({ username: username }) }
      onPress={() => this.props.navigation.navigate('Chat', { username: this.state.username })}
      ></Button>
      </View>
      </ImageBackground>
    </View>
  )}
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    flex: .85,
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '88%',
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#757083',
    color: '#000',
    fontSize: 25,
    padding: 10
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  box: {
    height: '44%',
    width: '88%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    height: 40,
    backgroundColor: '#757083',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
