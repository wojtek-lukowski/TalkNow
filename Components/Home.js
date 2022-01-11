import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const image = require('../Images/bcg-img.png');

const backgroundColor = ['#090C08', '#474056', '#8A95A5', '#7F8778'];
export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      color: backgroundColor[0]
    };
  }

  // onPress() {
  //  (username) => this.setState({ username: username });
  //   this.props.navigation.navigate('Chat');
  // }

  setUser(username) {
    if (!username) {
      return Alert.alert('Please enter your name')
    } else {
      this.setState({ username })
    }
  }

  render() {
    console.log(this.state);

  return (
    <View style={styles.home}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.welcome}>TalkNow</Text>
        <View style={styles.box}>
          <View style={styles.insideBox}>
            <TextInput
            style={styles.input}
            placeholder="Enter your name"
            // onChangeText={ (username) => this.setState({ username }) }
            onChangeText={ (username) => this.setUser(username) }
            defaultValue={this.state.username}
            ></TextInput>
            <View style={ styles.colorSelection }>
              <Text style={styles.colorText}>Choose Your Color:</Text>
              <View style={styles.colorButtons}>
                {backgroundColor.map(color =>
                <TouchableHighlight key={color.id}
                style={[styles.buttonColor, {backgroundColor: color}]} onPress={() => this.setState({ color })}>
                </TouchableHighlight>
                )}
              </View>
            </View>
            <TouchableHighlight
            style={[styles.button, {backgroundColor: this.state.color,}]}
            onPress={() => this.props.navigation.navigate('Chat', { username: this.state.username, color: this.state.color } )}>
              <Text style={styles.buttonText}>ENTER THE CHAT</Text>
            </TouchableHighlight>
        </View>
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
    marginTop: 50,
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#757083',
    color: '#000',
    fontSize: 20,
    padding: 10
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  box: { //whole white panel
    height: '44%',
    width: '88%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
  },
  insideBox: { //sets the 88% width within the white panel
    height: '100%',
    width: '88%',
    justifyContent: 'space-evenly',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '100%',
    backgroundColor: backgroundColor[1],
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  colorButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 80
  },
  buttonColor: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  buttonColor1: {
    backgroundColor: backgroundColor[0]
  },
  buttonColor2: {
    backgroundColor: backgroundColor[1]
  },
  buttonColor3: {
    backgroundColor: backgroundColor[2]
  },
  buttonColor4: {
    backgroundColor: backgroundColor[3]
  },
  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    alignSelf: 'flex-start'
  }
});
