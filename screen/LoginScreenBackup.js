import React, { Component } from 'react';
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

// import AsyncStorage from '@react-native-async-storage/async-storage';
const imagebg = { uri: "https://reactjs.org/logo-og.png" };
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Nama : 'Cahyo Prabowo',
      Username : '',
      Password : '',
      FormValidation : 2,
      showAlertError : false,
      showAlertSuccess : false,
      ShowLoading : false,
      ErrorMessage :  "",
      SuccessMessage : "",
      
    };
  }

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

  showAlertSuccess = () => {
    this.setState({
      showAlertSuccess: true
    });

    setTimeout(()=>{
      this.setState({
        showAlertSuccess: false
      });
    },3000)

  };

  _storeData = async (Name,Value) => {
    try {
      await AsyncStorage.setItem(
        Name,
        Value
      );
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async (Name) => {
    try {
      const value = await AsyncStorage.getItem(Name);
      if (value !== null) {
        // We have data!!
        this.setState({
          [Name] : value
        })
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  cekFormValidation = ()=>{
    if(this.state.Username!="" &&this.state.Password!=""  ){
      this.setState({
        FormValidation : true
      })
    }
  }


  login = ()=>{

    
 const statForm = this.state.FormValidation;
    
 if(statForm == true){
  this.setState({
    ShowLoading : true
  })
  const _Username = this.state.Username;
  const _Password = this.state.Password;
  const Api  = global.Api + "User/GetProfile?Email="+_Username+"&&Password="+_Password;
  console.log("Api=" + Api);
  fetch(Api).then(
    Response => Response.json()
  ).then(
    json => {
      const Status = json['Status'] ;
      const Message = json['Message'];
      if(Status == "False"){
        this.setState({
          ErrorMessage : Message
        })
        setTimeout(()=>{
          this.setState({
            showAlertError : true ,
            ShowLoading : false
          })
        },3000)
      }else{

        

            this._storeData('FirstName',json['FirstName']);
            this._storeData('Email',json['UserName']);
            this._storeData('isLogin',true);
            this._retrieveData('FirstName');

        this.setState({
          SuccessMessage : Message
        })
        setTimeout(()=>{
          this.showAlertSuccess();
          this.setState({
            ShowLoading : false
          })

          this.props.navigation.push('HomeScreen');

        },3000)


      }
    }
  )

 }else{
   this.setState({
     ErrorMessage : "Cek Kembali Isian Form Anda !",
     showAlertError : true,
     FormValidation : false
   })
 }

  }





  render() {
    const {state} = this;
    const { navigate } = this.props.navigation;
    const {Nama} = this.state;
    const {login} = this;
    const {cekFormValidation} = this;
    

    
    return (
        
      <View style={styles.container}
      pointerEvents = {
        this.state.ShowLoading ? "none" : "auto"
      }
      >
          <ImageBackground source={require("../Image/LoginBackgroungPatient.png")} resizeMode="cover" style={styles.image}>
      
        <View style={{flex:1}}>
        <Heading></Heading>
        </View>
        <View style={{flex:2,paddingLeft:30,paddingRight:30,marginBottom:80}}>
        <Text style={{fontSize:35,textAlign:'center',color:'white',fontWeight:'bold'}}>LOGIN</Text>
        <View style={{backgroundColor:'white',marginTop:30,height:70,padding:4,}}>
        <Input style={{fontSize:25}}
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
      this.setState({
        Username : res
      },()=>{
        cekFormValidation();
      })
    }
  }
/>
</View>
{
              this.state.Username == '' && this.state.FormValidation == false   ? <Text style={styles.textValidation}>Nama Harus Diisi !</Text> 
              : <Text></Text>
            }

<View style={{backgroundColor:'white',marginTop:15,height:70,padding:4,}}>
        <Input style={{fontSize:25}}
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
      this.setState({
        Password : res
      },()=>{
        cekFormValidation();
      })
    }
  }
/>


</View>

{
              this.state.Password == '' && this.state.FormValidation == false   ? <Text style={styles.textValidation}>Password Harus Diisi !</Text> 
              : <Text></Text>
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
            this.state.ShowLoading ?
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
        
        <AlertError showAlertError={state.showAlertError} cancelAlert={this} Title="Error" Message={state.ErrorMessage}/>
        <AlertSuccess showAlertSuccess={state.showAlertSuccess} Message={state.SuccessMessage}/>
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
