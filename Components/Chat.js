import React from 'react';
import { StyleSheet, View, Button, backgroundColor } from 'react-native';
import { Bubble, GiftedChat, SystemMessage, InputToolbar } from 'react-native-gifted-chat';
import { Platform, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const firebase = require('firebase');
require('firebase/firestore');

// const image = require('../Images/profile.jpg');
export default class Chat extends React.Component {
  constructor(props) {
    super(props);

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
      username: this.props.route.params.username,
      messages: [
        // {
        //   _id: 2,
        //     text: `${this.props.route.params.username} joined the chat`,
        //     createdAt: new Date(),
        //     system: true
        // } //not sure where to put the "joined chat" info now - in 'ComponentDidMount' it refreshed after each message, here disappears
      ],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: ''
      },
      isConnected: undefined,
      loggedInText: 'Connecting'
    }
  }

getMessages = async () => {
  let messages = '';
  try {
    messages = (await AsyncStorage.getItem('messages'))|| [];
    this.setState({
      messages: JSON.parse(messages)
    });
    console.log('getting from storage');
  } catch (error) {
    console.log(error.message);
  }
};

saveMessages = async () => {
  try {
    await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    console.log('saving to storage');
  } catch (error) {
    console.log(error.message);
  }
}

deleteMessages = async () => {
  try {
    await AsyncStorage.deleteItem('messages');
    this.setState({
      messages: []
    })
  } catch (error) {
    console.log(error.message)
  }
}

componentDidMount() {

  NetInfo.fetch().then(Connection => {
    if (Connection.isConnected) {
      console.log('online');
      this.setState({
        isConnected: true
      })
    } else {
      console.log('offline');
      this.setState({
        isConnected: false
      })
    }
  });

  this.getMessages();
  this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
      await firebase.auth().signInAnonymously();
    }
  this.setState({
    uid: user.uid,
    messages: [],
    user: {
      _id: user.uid,
      name: this.state.username,
      avatar: 'https://placeimg.com/140/140/any'
    },
    loggedInText: 'Hello there',
  });
  this.unsubscribe = this.referenceChat.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
  });
  this.referenceUser = firebase.firestore().collection('messages').where('uid', '==', this.state.uid);
  this.unsubscribeUser = this.referenceUser.onSnapshot(this.onCollectionUpdate);
}

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((message) => {
      var data = message.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        },
      });
    });
    this.setState({
      messages
    })
  }

  addMessage(newMessage) {
    const message = newMessage[0];
    this.referenceChat.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
      uid: this.state.uid
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    this.addMessage(messages);
    this.saveMessages();
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

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar {...props} />
      );
    }
  }

  render() {
    // let username = this.props.route.params.username;
    // let color = this.props.route.params.color;
    // let image = require('../Images/profile.jpg');

    this.props.navigation.setOptions({ title: this.state.username });
    
  return (
    <View style={styles.chatWrapper}>
      {/* <Text>{this.state.loggedInText}</Text> */}
    <GiftedChat
    messages={this.state.messages}
    onSend={messages => this.onSend(messages)}
    renderBubble={this.renderBubble.bind(this)}
    renderSystemMessage={this.renderSystemMessage.bind(this)}
    renderInputToolbar={this.renderInputToolbar.bind(this)}
    user={{
      _id: this.state.uid,
      name: this.state.username,
      avatar: 'https://placeimg.com/140/140/any'
    }}
    />
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
    }
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
  },
  chatWrapper: {
    flex: 1,
  }
});