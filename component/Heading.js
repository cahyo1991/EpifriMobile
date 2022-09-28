import React, { Component } from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';
import IconEpifri from '../Image/PatientIcon.png';
export function Heading()
{
return (
    <View style={{flex:1,marginTop:20}}>
<View style={{flexDirection:'row'}}>
    <View style={{flex:1}}></View>
    <View style={{flex:4}}>
        <View style={{flexDirection:'row',height:40}}>
        <View style={{flex:1,height:40}}>
            <Image source={IconEpifri} style={styles.stretch} />
        </View>
        <View style={{flex:2}}>
            <Text style={{color:'white',fontFamily:'roboto',fontSize:22,textAlign:'center',fontWeight:'bold'}}>Epilepsy Free</Text>
            <Text style={{color:'white',fontFamily:'roboto',fontSize:22,textAlign:'center',fontWeight:'bold'}}>Journey</Text>
        </View>
        </View>
    </View>
    <View style={{flex:1}}></View>
</View>
</View>
);

}

const styles = StyleSheet.create({
    text :{
        fontSize : 20
    },
    stretch: {
        width: '130%',
        height: undefined,
        aspectRatio: 1,
        marginTop:-20,
        marginLeft : -10

      },
})