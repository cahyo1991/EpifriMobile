import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground,TextInput,TouchableOpacity,ActivityIndicator } from 'react-native';
import { Heading } from '../component/Heading';
import BgLogin from '../Image/LoginBackgroungPatient.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { HeadingBackground } from '../component/HeadingBackground';
import { AlertError } from '../component/AlertError';
import { AlertSuccess } from '../component/AlertSuccess';
const imagebg = { uri: "https://reactjs.org/logo-og.png" };
class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email : '',
      FormValidation : 2,
      ShowLoading : false,
      showAlertError : false,
      showAlertSuccess : false,
      ErrorMessage : '',
      SuccessMessage : ''
    };
  }

  DoResetPassword = () =>{
    const Email = this.state.Email;
    if (Email!="") {
      this.setState({
        ShowLoading : true
      })

      const Api  = global.Api + "User/ForgotPassword?Email="+Email
      fetch(Api).then(
        Response => Response.json()
      ).then(
        json => {
          console.log("result fp",json)
          if (json['Status'] == 'True') {
            setTimeout(()=>{
              this.setState({
                ShowLoading : false,
                SuccessMessage : json['Message'],
                showAlertSuccess : true,
              })

            },3000)
          }else{
            setTimeout(()=>{
              this.setState({
                ShowLoading : false,
                ErrorMessage : json['Message'],
                showAlertError : true,
              })

            },3000)
          }
        }
      )

    }else{
      this.setState({
        FormValidation : false
      })
    }
  }

  
  hideAlertError = () => {
    this.setState({
      showAlertError: false
    });
  };


  render() {
    const { navigate } = this.props.navigation;
    const {DoResetPassword} = this;
    return (
        
      <View style={styles.container}>
          <ImageBackground source={require("../Image/Patient_Background.png")} resizeMode="cover" style={styles.image}>
        <View style={{flex:1}}>
        <HeadingBackground></HeadingBackground>
        </View>
 
        <View style={{flex:5,paddingLeft:30,paddingRight:30}}>
            <View style={{flexDirection:'column',height:'100%'}}> 
            <View style={{ flex: 1, }} />
      <View style={{ flex: 2, backgroundColor: "#e2e2e4",padding:20 }} >
      <Text style={{fontSize : 25,fontWeight:'bold',textAlign:'center',marginTop:20,color:'#662d91'}}>Lupa Password?</Text>
      <Text style={{fontSize : 20,textAlign:'center',marginTop:20,color:'#662d91'}}>Kirim Email</Text>
      <View style={{backgroundColor:'#f2f2f4',height:60,marginTop:20}}>
            <Input
            style={{paddingTop:15}}
              inputContainerStyle={{borderBottomWidth:0}}
  placeholder=''
  onChangeText = {
    (res)=>{
      this.setState({
        Email : res
      })
    }
  }
/>
            </View>
            {
              this.state.Email == '' && this.state.FormValidation == false   ? <Text style={styles.textValidation}>Email Harus Diisi !</Text> 
              : <View></View>
            }

{
  this.state.ShowLoading ?
<ActivityIndicator size="large" color="#662d91"  style={styles.loading}/> : 
<View></View>
}

            <View style={{flexDirection:'row',height:60,marginTop:20}}>
            <View style={{ flex: 1, paddingRight: 7,paddingLeft:7,paddingTop:5,paddingBottom:5 }} >
            <LinearGradient colors={['#6857d6', '#876ae3', '#aa7ef3']} style={styles.linearGradient}>
              <TouchableOpacity
              onPress={()=>navigate('LoginScreen')}
              >
  <Text style={styles.buttonText}>
    BATAL
  </Text>
  </TouchableOpacity>
</LinearGradient>
                </View>
            <View style={{ flex: 1,paddingRight: 7,paddingLeft:7,paddingTop:5,paddingBottom:5}} >
            <LinearGradient colors={['#6857d6', '#876ae3', '#aa7ef3']} style={styles.linearGradient}>
              <TouchableOpacity
                onPress={
                  ()=> {
                    DoResetPassword()
                  }
                }
              >
  <Text style={styles.buttonText}>
    KIRIM
  </Text>
  </TouchableOpacity>
</LinearGradient>
                </View>
            </View>
      </View>
      <View style={{ flex: 1,  }} />
            </View>
        </View>
 
        <AlertError showAlertError={this.state.showAlertError} cancelAlert={this} Title="Error" Message={this.state.ErrorMessage}/>
        <AlertSuccess showAlertSuccess={this.state.showAlertSuccess} Message={this.state.SuccessMessage}/>
        
        </ImageBackground>
      </View>
    );
  }
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
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    borderColor:'#662d91',
    borderWidth:1
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Roboto',
    textAlign: 'center',
    margin: 10,
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
  textValidation : {
    fontSize:15,color:'red',fontStyle:'italic',marginTop:10
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -100,
    bottom: 0,
    zIndex : 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  });

export default ForgotPasswordScreen;
