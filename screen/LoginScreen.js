import React, { useState,useContext, useEffect } from 'react';
import { View, Text, StyleSheet,ImageBackground,TextInput,TouchableOpacity,AsyncStorage,ActivityIndicator   } from 'react-native';
import { Heading } from '../component/Heading';
import BgLogin from '../Image/LoginBackgroungPatient.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
import { AlertError } from '../component/AlertError';
import { AlertSuccess } from '../component/AlertSuccess';
import { AuthContext } from '../context';
import { useNavigation } from '@react-navigation/native';
import AuthLogin from '../component/AuthLogin';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const imagebg = { uri: "https://reactjs.org/logo-og.png" };
 function LoginScreen () {
  const{navigate} = useNavigation();
  const {signIn,signOut} = React.useContext(AuthContext);
  
  

  const [Username,SetUsername]= useState('');
  const [Password,SetPassword]= useState('');
  const [FormValidation,SetFormValidation]= useState(2);
  const [showAlertError,SetshowAlertError]= useState(false);
  const [showAlertSuccess,SetshowAlertSuccess]= useState(false);
  const [ShowLoading,SetShowLoading]= useState();
  const [ErrorMessage,SetErrorMessage]= useState('');
  const [SuccessMessage,SetSuccessMessage]= useState('');

  const _RemoveData = async (Name) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
}

  const login = ()=>{
    
    if(Username!='' && Password!=''){
      
     SetShowLoading(true);
     const _Username = Username;
     const _Password = Password;
     const Api  = global.Api + "User/GetProfile?Email="+_Username+"&&Password="+_Password;
     console.log("Api=" + Api);
     fetch(Api).then(
       Response => Response.json()
     ).then(
       json => {
         const Status = json['Status'] ;
         const Message = json['Message'];
         if(Status == "False"){
          //  this.setState({
          //    ErrorMessage : Message
          //  })
          SetErrorMessage(Message);
          SetshowAlertError(true);
          SetShowLoading(false);

           setTimeout(()=>{
            //  this.setState({
            //    showAlertError : true ,
            //    ShowLoading : false
            //  })
            SetshowAlertError(false);
            
           },3000)
         }else{
   
           
   
               _storeData('FirstName',json['FirstName']);
               _storeData('Email',json['UserName']);
               _storeData('UserID',json['UserID']);
               _storeData('isLogin','true');
               _retrieveData('FirstName');
               _retrieveData('isLogin');
          SetSuccessMessage(Message)
          SetshowAlertSuccess(true);
          SetShowLoading(false);

          setTimeout(()=>{
            SetshowAlertSuccess(false);
            signIn();
            // navigate('AuthLogin');
          },3000)

   
   
         }
       }
     )
   
    }else{
      SetFormValidation(false);
  

    }

     }

     


  // useEffect(()=>{
    
  //   const ValidationSession = async()=>{
  //     const isLogin  = await AsyncStorage.getItem('isLogin');
  //     if (isLogin){
  //       // _RemoveData('isLogin');
  //       signIn();
  //       // AsyncStorage.clear();
  //     }else{
  //       // alert('error')
  //       // _RemoveData('isLogin');
  //       signOut();
  //       // AsyncStorage.clear();
  //     }
  //   }
  //   ValidationSession();
  // },)


//   useEffect(() => {
//     cekFormValidation();
//  }, [Username,Password])

  const cekFormValidation = ()=>{
    if( Username !="" && Password !=""  ){
      SetFormValidation(
        FormValidation => true
      )
    }
  }

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














    return (
        
      <View style={styles.container}
      >
          <ImageBackground source={require("../Image/LoginBackgroungPatient.png")} resizeMode="cover" style={styles.image}>
      
        <View style={{flex:1}}>
        <Heading></Heading>
        </View>
        <View style={{flex:2,paddingLeft:30,paddingRight:30,marginBottom:80}}>
        <Text style={{fontSize:35,textAlign:'center',color:'white',fontWeight:'bold'}}>LOGIN
        </Text>
        <View style={{backgroundColor:'white',marginTop:30,height:70,padding:4,}}>
        <Input style={{fontSize:20}}
  placeholder='@username'
  inputContainerStyle={{borderBottomWidth:0}}
  leftIcon={
    <Icon
      name='user'
      size={35}
      color='#662d91'
      style={{marginRight:10}}
    />
  }
  onChangeText ={
    (res)=>{
      SetUsername(
        Username => res
      )
    }
  }
/>
</View>
{
              Username == '' && FormValidation == false   ? <Text style={styles.textValidation}>Nama Harus Diisi !</Text> 
              : <View></View>
            }

<View style={{backgroundColor:'white',marginTop:15,height:70,padding:4,}}>
        <Input style={{fontSize:20}}
  placeholder='******'
  inputContainerStyle={{borderBottomWidth:0}}
  secureTextEntry={true}
  leftIcon={
    <Icon
      name='lock'
      size={35}
      color='#662d91'
      style={{marginRight:10}}
    />
  }
  onChangeText={
    (res)=>{
      SetPassword(
        Password => res
      )
    }
  }
/>


</View>

{
              Password == '' && FormValidation == false   ? <Text style={styles.textValidation}>Password Harus Diisi !</Text> 
              : <View></View>
            }

<View style={{height:20,marginTop:10}}>
        <TouchableOpacity
onPress={()=>navigate('ForgotPasswordScreen')}
>
 
<Text style={{color:'#662d91',}}>Lupa Password!</Text>

</TouchableOpacity>
</View>


        </View>

        <View style={{flex:2,paddingLeft:30,paddingRight:30,}}>

<View style={{height:60,flexDirection:'row'}}>
{/* <TouchableOpacity> */}
<View style={{flex:1}}>

</View>
<View style={{flex:3}}>

{
            ShowLoading ?
            <ActivityIndicator size="large" color="#662d91"  style={styles.loading}/> 
            : <View></View>

          }

<LinearGradient colors={['#6857d6', '#876ae3', '#aa7ef3']} style={styles.linearGradient}>
<TouchableOpacity
onPress={()=> login()
}
>
  <Text style={styles.buttonText}>
    OK
  </Text>
  </TouchableOpacity>
</LinearGradient>

</View>
<View style={{flex:1}}></View>

{/* </TouchableOpacity> */}
</View>

<View style={{height:60,flexDirection:'row',marginTop:20}}>
{/* <TouchableOpacity> */}
<View style={{flex:1}}></View>
<View style={{flex:3}}>
<LinearGradient colors={['#ffffff', '#ffffff', '#ffffff']} style={styles.linearGradient}>
  <TouchableOpacity
  onPress={()=>navigate('RegisterScreen')}
  >
  <Text style={styles.buttonTextAkun}>
    BUAT AKUN 
  </Text>
  </TouchableOpacity>
</LinearGradient>
</View>
<View style={{flex:1}}></View>

{/* </TouchableOpacity> */}
</View>



        </View>
        
        <AlertError showAlertError={showAlertError} cancelAlert={this} Title="Error" Message={ErrorMessage}/>
        <AlertSuccess showAlertSuccess={showAlertSuccess} Message={SuccessMessage}/>
        </ImageBackground>
      </View>
    );
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    },
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: -190,
      bottom: 0,
      zIndex : 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    searchSection: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding:30,
  },
  searchIcon: {
      padding: 10,
  },
  input: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 0,
      backgroundColor: '#fff',
      color: '#424242',
  },
  textValidation : {
    fontSize:15,color:'red',fontStyle:'italic'
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    borderColor:'#662d91',
    borderWidth:1
  },
  buttonText: {
    fontSize: 23,
    fontFamily: 'Roboto',
    textAlign: 'center',
    margin: 12,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  buttonTextAkun: {
    fontSize: 23,
    fontFamily: 'Roboto',
    textAlign: 'center',
    margin: 15,
    color: '#662d91',
    fontWeight:'bold',
    backgroundColor: 'transparent',
  },
  });

export default LoginScreen;
