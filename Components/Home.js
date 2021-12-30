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
      <Text style={styles.text}>TalkNow</Text>
      <TextInput
      style={styles.input}
      placeholder="Enter your name"
      onChangeText={ (username) => this.setState({ username: username }) }
      defaultValue={this.state.username}
      ></TextInput>
      <Button title="Enter the chat"
      // onPress={ this.onPress }
      // onPress={ (username) => this.setState({ username: username }) }
      onPress={() => this.props.navigation.navigate('Chat', { username: this.state.username })}
      ></Button>
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
  text: {
    fontSize: 20,
    color: '#40D4C7',
  },
  input: {
    height: 40,
    backgroundColor: '#40D4C7',
    color: '#000',
    fontSize: 25
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  }
});
