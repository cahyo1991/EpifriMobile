import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

export function AlertSuccess(props){
    return (
      <AwesomeAlert
      show={props.showAlertSuccess}
      showProgress={true}
      title= "Success"
      message={props.Message}
      titleStyle={styles.Title}
      messageStyle = {styles.Message}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={true}
    />
    )
}


const styles = StyleSheet.create({
  Title : {
    fontSize : 25,
    marginTop:-20,
    fontWeight:'bold'
  },
  Message : {
    fontSize : 20
  },
  btn : {
    fontSize:17
  }

})