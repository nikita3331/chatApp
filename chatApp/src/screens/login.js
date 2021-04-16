import React,{useState} from 'react'
import {  StyleSheet ,Text,Linking,TextInput,TouchableOpacity,View} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { handleLogin } from '../actions/user'


const LoginScreen= (props)=>{
    const [loginVal,SetLogin]=useState('')
    const [passwordVal,SetPass]=useState('')

    const handleLogin=()=>{
        props.handleLogin(loginVal,passwordVal)
    }

    return(
        <View style={styles.containerStyle}>
            <Text style={styles.headerStyle}>Please log in</Text>
            <TextInput
                testID="loginField"
                placeholder="Login"
                style={styles.inputStyle}
                value={loginVal}
                onChangeText={(e)=>{SetLogin(e)}}
            />
            <TextInput
                testID="passwordField"
                placeholder="Password"
                secureTextEntry={true}
                style={{...styles.inputStyle,marginTop:20}}
                value={passwordVal}
                onChangeText={(e)=>{SetPass(e)}}
            />
            <TouchableOpacity 
                testID="loginButton"
                style={styles.buttonStyle} 
                onPress={()=>{handleLogin()}}
            >
                <Text>Login</Text>
            </TouchableOpacity>
        </View>

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
    return bindActionCreators({handleLogin}, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);

