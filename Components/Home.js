import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const image = require('../Images/bcg-img.png');
export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      color: '#757083'
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
                <TouchableOpacity style={styles.buttonColor} onPress={() => this.setState({ color: '#090C08' })}></TouchableOpacity>
                {/* <View style={[styles.buttonColor, styles.buttonColor1]} onPress={() => this.setState({ color: '#090C08' })}></View> */}
                <TouchableOpacity style={[styles.buttonColor, styles.buttonColor2]} onPress={() => this.setState({ color: '#474056' })}></TouchableOpacity>
                {/* <View style={[styles.buttonColor, styles.buttonColor2]} onPress={() => this.setState({ color: '#474056' })}></View> */}
                <TouchableOpacity style={[styles.buttonColor, styles.buttonColor3]} onPress={() => this.setState({ color: '#8A95A5' })}></TouchableOpacity>
                <TouchableOpacity style={[styles.buttonColor, styles.buttonColor4]} onPress={() => this.setState({ color: '#B9C6AE' })}></TouchableOpacity>
              </View>
            </View>
            <Button title="Enter the chat"
            style={styles.button}
            // onPress={ this.onPress }
            // onPress={ (username) => this.setState({ username: username }) }
            onPress={() => this.props.navigation.navigate('Chat', { username: this.state.username } )}
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
    backgroundColor: 'black',
    borderRadius: 50,
  },
  buttonColor1: {
    backgroundColor: '#090C08'
  },
  buttonColor2: {
    backgroundColor: '#474056'
  },
  buttonColor3: {
    backgroundColor: '#8A95A5'
  },
  buttonColor4: {
    backgroundColor: '#B9C6AE'
  },
  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    alignSelf: 'flex-start'
  }
});
