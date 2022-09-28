import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,ImageBackground } from 'react-native';
import IconEpifri from '../Image/PatientIcon.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
export function HeadingBackgroundMenu(props)
{
return (
    <View style={{flex:1}}>
        <ImageBackground source={require("../Image/LoginBackgroungPatient.png")} resizeMode="cover" style={styles.image}>
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
    <View style={{flex:1}}>
    <View style={{marginLeft:20,marginTop:10}}>
        <Icon name="bars" size={35}
        style={{color:'white'}}
    onPress={()=> props.nav.dispatch(DrawerActions.openDrawer()) }
    />
        </View>
    </View>
</View>

</View>
</ImageBackground>
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
      image: {
        flex: 1,
        justifyContent: "center"
      },
})