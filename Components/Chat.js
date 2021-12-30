import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default class Chat extends React.Component {

  render() {
  return (
    <View style={styles.chat}>
      <Text>Hello World, this is the chat page</Text>
      <Text></Text>
    </View>
  )
  }
}

const styles = StyleSheet.create({
  chat: {
    flex: 1,
    backgroundColor: '#000',
    color: '#40D4C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});