import React,{useState,useEffect} from 'react';
import {StyleSheet,Text,TouchableOpacity,SafeAreaView} from 'react-native';

import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { Provider, useSelector } from 'react-redux'
import Navigator from './navigator'
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://127.0.0.1:8010');

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware) 

const App=() => {
  useEffect(()=>{
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(message.data);
    };
  },[])
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex:1}} edges={['right', 'top', 'left']}>
        <Navigator/>
      </SafeAreaView>
  </Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;
