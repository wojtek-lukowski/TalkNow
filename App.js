import { StatusBar } from 'expo-status-bar';
import reactDom from 'react-dom';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import Home from './Components/Home';
import Chat from './Components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home} />
          <Stack.Screen
            name="Chat"
            component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

