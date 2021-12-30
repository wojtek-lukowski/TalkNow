import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: '' };
  }

  onPress() {
   
  }

  render() {
    console.log(this.state);

  return (
    <View style={styles.home}>
      <Text style={styles.text}>Welcome, enter your name to start</Text>
      <TextInput
      style={styles.input}
      placeholder="Enter your name"
      // onChangeText={ (username) => this.setState({ username: username }) }
      defaultValue={this.state.username}
      ></TextInput>
      <Button title="Enter the chat"
      // onPress={ this.onPress }
      onPress={ (username) => this.setState({ username: username }) }
      onPress={() => this.props.navigation.navigate('Chat')}
      ></Button>
    </View>
  )
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#000',
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
  }
});
