import React,{useEffect, useState} from 'react'
import {  StyleSheet ,Text,ScrollView,TouchableOpacity,View,Image} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import {fetchUserList} from '../func/users'
import {IntroMessage} from '../types'

type MessageListProps ={
    messages: Array<IntroMessage>;
}

const MainScreen= (props)=>{
    const {navigation}=props
    const [modalVis,SetModalVis]=useState(false)
    const MessageList=({messages}:MessageListProps)=>{
        return(
            <Text>Message list</Text>
        )
    }
    const NewMessageButt=()=>{
        return(
            <TouchableOpacity 
                style={styles.newMessageButton}
                onPress={()=>{SetModalVis(true)}}
                >
                <Icon
                    name="message"
                    type="entypo"
                    size={35}
                    color='white'
                />
            </TouchableOpacity>
        )
    }
    const NewMessageModal=()=>{
        const [isLoading,SetLoading]=useState(false)

        const [userList,SetUserList]=useState([])
        const fetchUsers=async ()=>{
            SetLoading(true)
            let resp=await fetchUserList(props.user.authKey)
            SetUserList(resp)
            SetLoading(false)
        }
        useEffect(()=>{
            modalVis&&fetchUsers()
        },[modalVis])
        const onItemPress=(item)=>{
            navigation.navigate('ChatScreen',{item:item})
            console.log(item)
        }
        return(
            <Modal
                isVisible={modalVis}
                onBackdropPress={()=>{SetModalVis(false)}}
                onBackButtonPress={()=>{SetModalVis(false)}}
                useNativeDriver={true}
            >
                <View style={styles.modalStyle}>
                    <Text style={styles.pickPersonStyle}>Pick person from list</Text>
                    {isLoading?
                    <Text>Loading...</Text>:
                    userList.map((item,index)=>{
                        let {login,avatarUri}=item;
                        
                        return(
                            <TouchableOpacity 
                                key={index} 
                                style={styles.listItemStyle}
                                onPress={()=>{onItemPress(item)}}
                            >
                                <Image source={{uri:avatarUri}} style={styles.avatarStyle}/>
                                <Text style={styles.userNameStyle}>{login}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </Modal>
        )
    }
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
            <NewMessageModal/>
            <ScrollView>
                <Text testID="mainHelloText">Main screen</Text>
                <MessageList messages={props.messages.messageArray}/>
            </ScrollView>
            <NewMessageButt />
        </View>

    )

}
const styles = StyleSheet.create({
    newMessageButton:{
        backgroundColor:'green',
        padding:10,
        borderRadius:100,
        position:'absolute',
        right:15,
        bottom:15
    },
    pickPersonStyle:{
        fontSize:25,
        color:'black',
        fontWeight:'bold'
    },
    modalStyle:{
        backgroundColor:'white',
        alignSelf:'center',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:20
    },
    avatarStyle:{
        width:50,
        height:50,
        borderRadius:50
    },
    userNameStyle:{
        fontSize:20,
        marginLeft:20,
        fontWeight:'bold'
    },
    listItemStyle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'gray',
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:10
    }
})
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user,
        messages: state.messages
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MainScreen);

