import React from 'react';
import { StyleSheet, View, backgroundColor } from 'react-native';
import { Bubble, GiftedChat, SystemMessage } from 'react-native-gifted-chat';
import { Platform, KeyboardAvoidingView } from 'react-native';

const firebase = require('firebase');
require('firebase/firestore');

const image = require('../Images/profile.jpg');
export default class Chat extends React.Component {
  constructor() {
    super();

    const firebaseConfig = {
      apiKey: "AIzaSyApvLhq2F-kVtPjBTIXAQlJLqI3GRHyMl4",
      authDomain: "talknow-8f240.firebaseapp.com",
      projectId: "talknow-8f240",
      storageBucket: "talknow-8f240.appspot.com",
      messagingSenderId: "1088866743334",
      appId: "1:1088866743334:web:73827e3460a6f002fae2e7"
    };

    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
      }

    this.referenceChat = firebase.firestore().collection('messages');

    this.state = {
      messages: [],
    }
  }
  
  // componentDidMount() {
  //   this.setState({
  //     messages: [
  //       {
  //         _id: 1,
  //         text: `Hello ${this.props.route.params.username}`,
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: 'React Native',
  //           avatar: 'https://placeimg.com/140/140/any',
  //         },
  //       },
  //       {
  //         _id: 2,
  //         text: `${this.props.route.params.username} joined the chat`,
  //         createdAt: new Date(),
  //         system: true
  //       }
  //     ],
  //   })
  // }

  componentDidMount() {
    this.referenceChat = firebase.firestore().collection('messages');
    this.unsubscribe = this.referenceChat.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [{
      _id: 2,
        text: `${this.props.route.params.username} joined the chat`,
        createdAt: new Date(),
        system: true
    }];
    querySnapshot.forEach((message) => {
      var data = message.data();
      messages.push({
        id: data.id,
        text: data.text,
        createdAt: data.createdAt,
        user: data.user
      });
    });
    this.setState({
      messages
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
          backgroundColor: this.props.route.params.color
        }
      }}
      />
    )
  }

  renderSystemMessage(props) {
		return <SystemMessage {...props} textStyle={{ color: this.props.route.params.color }} />;
	}

  
  render() {
    let username = this.props.route.params.username;
    let color = this.props.route.params.color;
    let image = require('../Images/profile.jpg');

    this.props.navigation.setOptions({ title: username });
    
  return (
    <View style={styles.chatWrapper}>
    <GiftedChat
    messages={this.state.messages}
    onSend={messages => this.onSend(messages)}
    renderBubble={this.renderBubble.bind(this)}
    renderSystemMessage={this.renderSystemMessage.bind(this)}
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