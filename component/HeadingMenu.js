import React, { Component } from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEpifri from '../Image/PatientIcon.png';
import { DrawerActions } from '@react-navigation/native';
export function HeadingMenu(props)
{
    // const { navigate } = this.props.navigation;
return (
    <View style={{flex:1,marginTop:20}}>
<View style={{flexDirection:'row'}}>
    <View style={{width:20}}></View>
    <View style={{flex:4}}>
        <View style={{flexDirection:'row',height:40}}>
        <View style={{flex:1,}}>
            <Image source={IconEpifri} style={styles.stretch} />
        </View>
        <View style={{flex:2}}>
            <Text style={{color:'white',fontFamily:'roboto',fontSize:22,textAlign:'center',fontWeight:'bold'}}>Epilepsy Free</Text>
            <Text style={{color:'white',fontFamily:'roboto',fontSize:22,textAlign:'center',fontWeight:'bold'}}>Journey</Text>
        </View>
        </View>
    </View>
    <View style={{flex:1}}>
        <View style={{marginLeft:20,marginTop:0}}>
        <Icon name="bars" size={35}
        style={{color:'white'}}
    onPress={()=> props.nav.dispatch(DrawerActions.openDrawer()) }
    />
        </View>
    </View>
</View>
</View>
);

}

const styles = StyleSheet.create({
    text :{
        fontSize : 20
    },
    stretch: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        marginTop:-20,
        marginLeft :20

      },
})