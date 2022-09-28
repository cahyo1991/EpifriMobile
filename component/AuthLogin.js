import { useNavigation } from '@react-navigation/native';
import React,{useEffect} from 'react'
import { StyleSheet,Text,View,AsyncStorage } from 'react-native'
import { AuthContext } from '../context'


const AuthLogin = () =>{


  const _storeData = async (Name,Value) => {
    try {
      await AsyncStorage.setItem(
        Name,
        Value
      );
    } catch (error) {
      // Error saving data
    }
  };

  const _retrieveData = async (Name) => {
    try {
      const value = await AsyncStorage.getItem(Name);
      if (value !== null) {
        // We have data!!
        console.log(Name + " " + value)
        
      }
    } catch (error) {
      // Error retrieving data
    }
  };



  const {signIn,signOut} = React.useContext(AuthContext);
  const{navigate} = useNavigation();
  useEffect(()=>{
    
    // AsyncStorage.clear();
    const ValidationSession = async()=>{
      const isLogin  = await AsyncStorage.getItem('isLogin');
      if (isLogin){
        signIn();
      }else{
        navigate('LoginScreen');
      }
    }
    ValidationSession();
  },)
  return (
    <View style={{flex:1}}>
      <View style={{flexDirection:'column',flex:1}}>
        <View style={{flex:2,}}></View>
        <View style={{height:90}}>
        <Text style={{fontSize:20,textAlign:'center'}}>Loading</Text>
        </View>
        <View style={{flex:2}}></View>

      
      </View>
    </View>
  )
}

export default AuthLogin