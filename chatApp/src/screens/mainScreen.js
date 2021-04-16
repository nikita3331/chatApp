import React from 'react'
import {  StyleSheet ,Text,Linking,ScrollView} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


const MainScreen= (props)=>{

    return(
        <Text testID="mainHelloText">Main screen</Text>
    )

}
const styles = StyleSheet.create({
    screenContainer:{
        flex:1,
        backgroundColor:'white',
        paddingHorizontal:20,
    },
    headerText:{
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center'
    },
    footerText:{
        paddingTop:20,
        fontSize:20,
        textAlign:'center'
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
export default connect(mapStateToProps,mapDispatchToProps)(MainScreen);

