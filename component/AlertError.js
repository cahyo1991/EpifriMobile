import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

export function AlertError(props){
    return (
        <AwesomeAlert
        
        show={props.showAlertError}
        showProgress={true}
        title= {props.Title}
        message={props.Message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        titleStyle={styles.Title}
        // showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Back"
        confirmButtonColor="#DD6B55"
        confirmButtonTextStyle = {styles.btn}
        messageStyle = {styles.Message}
        // onCancelPressed={() => {
        //   this.hideAlert();
        // }}
        onConfirmPressed={() => {
          props.cancelAlert.hideAlertError();
        }}
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