import React from 'react';
import { StyleSheet, View, Text, backgroundColor } from 'react-native';
export default class Chat extends React.Component {

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