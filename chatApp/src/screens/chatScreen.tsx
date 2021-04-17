import React,{useState,useEffect} from 'react'
import {  StyleSheet ,Text,Animated,TextInput,Keyboard,TouchableOpacity,View} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { handleLogin } from '../actions/user'
import { Icon } from 'react-native-elements';
import theme from '../theme'

const CustomInput=({onSend})=>{
    const beginWidth=theme.MAX_WIDTH*3/10
    const [input,SetInput]=useState("")
    return(
        <View 
            style={styles.inputContainerStyle}>
            <TextInput
                placeholder="Write message..."
                style={{...styles.inputStyle,width:'90%'}}
                value={input}
                onSubmitEditing={Keyboard.dismiss}
                onChangeText={(e)=>{SetInput(e)}}
            />
            <TouchableOpacity onPress={()=>{onSend(input);SetInput("")}}>
                <Icon
                    name="arrowright"
                    type="antdesign"
                    size={35}
                    color='black'
                />
            </TouchableOpacity>
        </View>
    )
}

const ChatScreen= (props)=>{
    const {navigation}=props
    const {item:PickedUser}=props.route.params
    useEffect(()=>{
        console.log('mounted')
    },[PickedUser])
    const onSend=(message)=>{
        console.log(message)
    }
    const Header=()=>{
        const {login}=PickedUser
        return(
            <View style={styles.headerStyle}>
                <TouchableOpacity 
                    style={{paddingVertical:10}}
                    onPress={()=>{navigation.goBack()}}
                >
                    <Icon
                        name="arrowleft"
                        type="antdesign"
                        size={35}
                        color='black'
                    />
                </TouchableOpacity>
                <Text style={styles.headerTextStyle}>Write to {login}</Text>
                <View/>
            </View>
        )
    }

    return(
        <View style={styles.containerStyle}>
            <Header/>
            <CustomInput onSend={onSend}/>
        </View>

    )

}
const styles = StyleSheet.create({
    containerStyle:{
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
    },
    headerStyle:{
        position:'absolute',
        top:0,
        backgroundColor:'red',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
    },
    headerTextStyle:{
        fontSize:25,
        fontWeight:'bold'
    },
    inputContainerStyle:{
        backgroundColor:'gray',
        position:'absolute',
        bottom:0,
        alignSelf:'center',
        paddingHorizontal:10,
        paddingVertical:10,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        flexDirection:'row',
        alignItems:'center',
        width:'100%'
    },
    inputStyle:{
        textAlign:'left',
        fontSize:25,
        backgroundColor:'white',
        borderRadius:5  
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
export default connect(mapStateToProps,mapDispatchToProps)(ChatScreen);

