import React from 'react';
import { StyleSheet, View, Text, backgroundColor, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  render() {
    let username = this.props.route.params.username;
    let color = this.props.route.params.color;
    this.props.navigation.setOptions({ title: username });
    
  return (
    <View style={[styles.chat, {backgroundColor: color}]}>
      <Text style={styles.text}>Hello {username}, this is your chat page</Text>
      <Text></Text>
    </View>
  )
  }
}

const styles = StyleSheet.create({
  chat: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginTop: 50
  }
});