import React, {Component} from 'react'
import {View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Alert, TextInput} from 'react-native'
import db from '../config'
import MyHeader from '../components/MyHeader' 
import firebase from 'friebase'

export default class RequestScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            userName : firebase.auth().currentUser.email,
            itemName : '',
            description : ''
        }
    }

    render(){
        return(
            <View style = {styles.container}>
                <MyHeader title = "Request An Item"/>
                <KeyboardAvoidingView style = {styles.keyBoardStyle}>

                    <TextInput style = {styles.formTextInput}
                    placeholder = {"Enter Item Name"}
                    onChangeText = {(text) => {
                        this.setState({
                            itemName : text
                        })
                    }}
                    value = {this.state.itemName}/>

                    <TextInput style = {[styles.formTextInput, {height : 300}]}
                    multiline
                    numberOfLines = {8}
                    placeholder = {"Reason for requesting the book"}
                    onChangeText = {(text) => {
                        this.setState({
                            description : text
                        })
                    }}
                    value = {this.state.description}/>

                    <TouchableOpacity style = {styles.button}
                    onPress ={() =>{
                        this.addItem(this.state.itemName, this.state.description)
                    }}>
                        <Text>Add Item</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }

    addItem =(itemName, description)=>{
        var userName = this.state.userName
        var itemName = this.state.itemName
        db.collection("exchange_requests").add({"username" : userName, "item_Name" : itemName, "description" : description})
        this.setState({
            itemName : "",
            description : ""
        })

        return Alert.alert("Item Ready to Exchange", '', [{text : 'Ok', onPress : () =>{
            this.props.navigation.navigate('HomeScreen')
        }}])
    }
}

styles = StyleSheet.create({
    container : {
        flex : 1
    }
})