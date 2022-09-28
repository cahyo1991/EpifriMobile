import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground,TextInput,TouchableOpacity,ActivityIndicator } from 'react-native';
import { Heading } from '../component/Heading';
import BgLogin from '../Image/LoginBackgroungPatient.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { HeadingBackground } from '../component/HeadingBackground';
import AwesomeAlert from 'react-native-awesome-alerts';
import { AlertSuccess } from '../component/AlertSuccess';

const imagebg = { uri: "https://reactjs.org/logo-og.png" };


class OtpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Nama : '',
      Email : '',
      Password : '',
      ShowLoading : false,
      FormValidation : 2,
      showAlertError: false ,
      showAlertSuccess : false,
      EmailOtp : this.props.route.params.Email
    };
  }

  showAlertSuccess = () => {
    this.setState({
      showAlertSuccess: true
    });
  };

  hideAlertSuccess = () => {
    this.setState({
      showAlertSuccess: false
    });
  };

  showAlertError = () => {
    this.setState({
      showAlertError: true
    });
  };

  hideAlertError = () => {
    this.setState({
      showAlertError: false
    });
  };

cekFormValidation =()=>{
  if(this.state.Password!="" ){
    this.setState({
      FormValidation : true
    })
  }
}

DoRegister = () =>{


const _Email = this.state.EmailOtp;
const _Password = this.state.Password;
 const  Url = global.Api + 'User/sendOTP/?Email='+_Email+'&&OTP='+_Password;



 const statForm = this.state.FormValidation;

 if (statForm == true){


 this.setState({
   ShowLoading : true
 })

   fetch(Url).then(
     Response => Response.json()
   ).then(
     json => {
       const Status = json['Status'] 
       if (Status == "True"){


        

         setTimeout(()=>{
          this.setState({
            ShowLoading : false
          },()=>{
            this.showAlertSuccess();
            setTimeout(()=>{
              this.props.navigation.navigate('LoginScreen');
            },2000)
            
          }
          )
     
         },3000)
        
       }else{
         alert(json['Message']);
         this.setState({
             ShowLoading : false
         })
       }
      }
   )
  }else{
    this.setState({
      FormValidation : false,
      showAlertError : true
    },()=>{
      // alert("Lengkapi Form !");
    })
    
  }

}
  


  render() {

    const {DoRegister} = this;
    const {cekFormValidation} = this;
    const {showAlertError} = this.state;
    const {hideAlertError} = this;
    const {showAlertSuccess} = this.state;
    const {hideAlertSuccess} = this;


    return (
        
      <View style={styles.container} 
      pointerEvents = {
        this.state.ShowLoading ? "none" : "auto"
      }
       
      >
          
      
          <ImageBackground source={require("../Image/Patient_Background.png")} resizeMode="cover" style={styles.image}>
        <View style={{flex:1}}>
        
        <HeadingBackground></HeadingBackground>
        </View>
 
        <View style={{flex:5,paddingLeft:20,paddingRight:20}}>
        {/* <ActivityIndicator size="large" color="#662d91"  style={styles.loading}/>  */}
          {
            this.state.ShowLoading ?
            <ActivityIndicator size="large" color="#662d91"  style={styles.loading}/> 
            : <Text></Text>

          }
        
        <Text style={{fontSize : 27,fontWeight:'bold',textAlign:'center',marginTop:20,color:'#662d91'}}>Masukkan OTP
        
        </Text>
            {/* input dan label */}
            <Text style={{fontSize : 15,marginTop:20,color:'#662d91',textAlign:'center'}}>
                Masukkan Kode OTP Yang di kirimkan Melalui Email Yang anda Daftarkan 
             </Text>
            <View style={{backgroundColor:'#f2f2f4',height:60,marginTop:15}}>
            <Input
            style={{paddingTop:15}}
              inputContainerStyle={{borderBottomWidth:0}}
  placeholder=''
  onChangeText ={
    (val) => 
    this.setState({
      Password : val
    },()=>{
      cekFormValidation()
    }
    )
  }
/>

            </View>
      
            
   
          
            {
              this.state.Password == '' && this.state.FormValidation == false ? <Text style={styles.textValidation}>OTP Harus Diisi !</Text> 
              : <Text></Text>
            }

            {/* input dan label */}

            <View style={{height:60,flexDirection:'row',marginTop:20}}>
{/* <TouchableOpacity> */}
<View style={{flex:1}}></View>
<View style={{flex:3}}>
<LinearGradient colors={['#6857d6', '#876ae3', '#aa7ef3']} style={styles.linearGradient}>
  <TouchableOpacity onPress={() => {
    DoRegister()
  }}>
  <Text style={styles.buttonText}>
    KIRIM
  </Text>
  </TouchableOpacity>
</LinearGradient>
</View>
<View style={{flex:1}}></View>

{/* </TouchableOpacity> */}
</View>

            
        </View>
 

        <AwesomeAlert
      show={showAlertSuccess}
      showProgress={true}
      title= "Success"
      message="OTP Berhasil , Silahkan Login Menggunakan Email Dan Password Anda !"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={true}
    />

<AwesomeAlert
      show={showAlertError}
      showProgress={true}
      title= "Error"
      message="Periksa Kembali Isian Form Anda !"
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={true}
      // showCancelButton={true}
      showConfirmButton={true}
      cancelText="No, cancel"
      confirmText="Back"
      confirmButtonColor="#DD6B55"
      // onCancelPressed={() => {
      //   this.hideAlert();
      // }}
      onConfirmPressed={() => {
        this.hideAlertError();
      }}
    />
        
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    textValidation : {
      fontSize:15,color:'red',fontStyle:'italic'
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

export default OtpScreen;
