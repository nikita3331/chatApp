

import React,{useState} from 'react'
import {  StyleSheet ,Text,Linking,TextInput,TouchableOpacity,View} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {LoginScreen,MainScreen} from './screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
const LoginNav=createBottomTabNavigator();
const MainNav=createBottomTabNavigator();

const LoginNavigator=()=>{
    return(
        <LoginNav.Navigator tabBar={()=>(null)}>
            <LoginNav.Screen name="LoginScreen" component={LoginScreen}  />   
        </LoginNav.Navigator>
    )
}
const MainNavigator=()=>{
    return(
        <MainNav.Navigator tabBar={()=>(null)}>
            <MainNav.Screen name="MainScreen" component={MainScreen}  />   
        </MainNav.Navigator>
    )
}
const Navigator= (props)=>{
    const {authKey}=props.user
    return(
        <NavigationContainer >
            {authKey!=null?
                <MainNavigator/>:
                <LoginNavigator/>
            }
        </NavigationContainer>
    )

}
const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor:'red',
        padding:20,
        alignSelf:'center',
        marginTop:30
    },
    containerStyle:{
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
    },
    inputStyle:{
        borderWidth:1,
        fontSize:30,
        paddingVertical:5,
        paddingHorizontal:20,
        width:'80%',
        textAlign:'center'
    },
    headerStyle:{
        fontSize:25,
        fontWeight:'bold',
        paddingBottom:20
    }



})
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Navigator);

