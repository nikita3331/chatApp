import React,{useEffect, useState} from 'react'
import {  StyleSheet ,Text,ScrollView,TouchableOpacity,View} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import {fetchUserList} from '../func/users'

interface IntroMessage {
    lastMessage: String;
    date: Date;
    avatarURI: String;
}
interface MessageListProps {
    messages: Array<IntroMessage>;
}

const MainScreen= (props)=>{
    const [modalVis,SetModalVis]=useState(false)
    const MessageList:MessageListProps=({messages})=>{
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
        const fetchUsers=()=>{
            SetLoading(true)
            let resp=['a','b']
            SetUserList(resp)
            SetLoading(false)
        }
        useEffect(()=>{
            modalVis&&fetchUsers()
        },[modalVis])
        return(
            <Modal
                isVisible={modalVis}
                onBackdropPress={()=>{SetModalVis(false)}}
                onBackButtonPress={()=>{SetModalVis(false)}}
                useNativeDriver={true}
            >
                <View style={{backgroundColor:'white',alignSelf:'center',paddingHorizontal:20,paddingVertical:10,borderRadius:20}}>
                    <Text style={styles.pickPersonStyle}>Pick person from list</Text>
                    {isLoading?
                    <Text>Loading...</Text>:
                    userList.map((item,index)=>(
                        <View key={index}>
                            <Text>{item}</Text>
                        </View>
                    ))}
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

