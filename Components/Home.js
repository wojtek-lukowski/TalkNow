import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const image = require('../Images/bcg-img.png');

const backgroundColor1 = '#090C08';
const backgroundColor2 = '#474056';
const backgroundColor3 = '#8A95A5';
const backgroundColor4 = '#B9C6AE';
export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      color: backgroundColor1
    };
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
          <View style={styles.insideBox}>
            <TextInput
            style={styles.input}
            placeholder="Enter your name"
            onChangeText={ (username) => this.setState({ username: username }) }
            defaultValue={this.state.username}
            ></TextInput>
            <View style={ styles.colorSelection }>
              <Text style={styles.colorText}>Choose Background Color:</Text>
              <View style={styles.colorButtons}>
                <TouchableOpacity style={[styles.buttonColor, styles.buttonColor1]} onPress={() => this.setState({ color: backgroundColor1 })}></TouchableOpacity>
                <TouchableOpacity style={[styles.buttonColor, styles.buttonColor2]} onPress={() => this.setState({ color: backgroundColor2 })}></TouchableOpacity>
                <TouchableOpacity style={[styles.buttonColor, styles.buttonColor3]} onPress={() => this.setState({ color: backgroundColor3 })}></TouchableOpacity>
                <TouchableOpacity style={[styles.buttonColor, styles.buttonColor4]} onPress={() => this.setState({ color: backgroundColor4 })}></TouchableOpacity>
              </View>
            </View>
            <Button title="Enter the chat"
            style={styles.button}
            // onPress={ this.onPress }
            // onPress={ (username) => this.setState({ username: username }) }
            onPress={() => this.props.navigation.navigate('Chat', { username: this.state.username, color: this.state.color } )}
            ></Button>
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
    fontSize: 25,
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
    height: 40,
    width: '100%',
    backgroundColor: '#757083',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  // colorSelection: { //text + color buttons
  //   backgroundColor: 'red',
  // },
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
    backgroundColor: backgroundColor1
  },
  buttonColor2: {
    backgroundColor: backgroundColor2
  },
  buttonColor3: {
    backgroundColor: backgroundColor3
  },
  buttonColor4: {
    backgroundColor: backgroundColor4
  },
  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    alignSelf: 'flex-start'
  }
});
