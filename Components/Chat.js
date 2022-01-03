import React from 'react';
import { StyleSheet, View, Text, backgroundColor, Alert } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { Platform, KeyboardAvoidingView } from 'react-native';

const image = require('../Images/profile.jpg');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true
        }
      ],
    })
  }
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
      <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000'
        }
      }}
      />
    )
    }
  
  render() {
    let username = this.props.route.params.username;
    // let color = this.props.route.params.color;
    this.props.navigation.setOptions({ title: username });
    
  return (
    <View style={styles.chatWrapper}>
    <GiftedChat
    messages={this.state.messages}
    onSend={messages => this.onSend(messages)}
    renderBubble={this.renderBubble}
    user={{
      _id: 1,
      name: {username},
      avatar: image
    }}
    />
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
    }
    </View>
    // <View style={[styles.chat, {backgroundColor: color}]}>
    //   <Text style={styles.text}>Hello {username}, this is your chat page</Text>
    // </View>
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
  },
  chatWrapper: {
    flex: 1,
  }
});