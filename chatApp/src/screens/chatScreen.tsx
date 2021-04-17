import React,{useState} from 'react'
import {  StyleSheet ,Text,Linking,TextInput,TouchableOpacity,View} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { handleLogin } from '../actions/user'
import { Icon } from 'react-native-elements';


const ChatScreen= (props)=>{
    const {navigation}=props
    const {item:PickedUser}=props.route.params
    console.log(PickedUser)
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

