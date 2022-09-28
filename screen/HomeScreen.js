import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground,TextInput,TouchableOpacity,Image,AsyncStorage } from 'react-native';
import { Heading } from '../component/Heading';
import BgLogin from '../Image/LoginBackgroungPatient.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { HeadingMenu } from '../component/HeadingMenu';
import { DrawerActions } from '@react-navigation/native';



const imagebg = { uri: "https://reactjs.org/logo-og.png" };
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email : '',
      FirstName : '',
      PatientName : '',
      PatientId : ''
    };
  }

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

  componentDidMount= async () =>{
    // alert("Tester")
    console.log("Tester")

    // await $.ajax({
    //   type : 'POST'
    // })

      await this._retrieveData('FirstName');
      await this._retrieveData('Email');
      await this._retrieveData('UserID');

      const ApiGetPatient = await global.Api + "Patient/GetPatient?UserId=" + this.state.UserID;
      console.log(ApiGetPatient)
      await fetch(ApiGetPatient).then(
        Response => Response.json()
      ).then(
        json => {
          // alert(JSON.stringify(json))
          for (let index = 0; index < json.length; index++) {
            if (json[index]['IsActive']=="1") {
                this.setState({
                  PatientName : json[index]['FirstName'],
                  IdPatient : json[index]['Id']
                })

                this._storeData('Idpatient',json[index]['Id'])

            }
            
          }
        }
      )


  }


  _getDataPatient= async () =>{
    const Api  = global.Api + "User/GetProfile?Email="+_Username+"&&Password="+_Password;
  console.log("Api=" + Api);
    await fetch()
  }

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

  render() {


    const { navigate } = this.props.navigation;
    const {navigation} = this.props;
    return (
        
      <View style={styles.container}>
          <ImageBackground source={require("../Image/LoginBackgroungPatient.png")} resizeMode="cover" style={styles.image}>
      
        <View style={{flex:1}}>
        <HeadingMenu nav={navigation}></HeadingMenu>
        </View>
        <View style={{flex:2,paddingLeft:30,paddingRight:30}}>
        <Text style={{fontSize:25,textAlign:'center',color:'white',}}>Halo Ayah/Ibu  </Text>
        <Text style={{fontSize:25,textAlign:'center',color:'white',fontWeight:'bold'}}>
          {this.state.PatientName == '' ? 'None' : this.state.PatientName}</Text>

        <View style={{flexDirection:'row',height:150,marginTop:20}}>
            <View style={{flex:1}}></View>
            <View style={{flex:2,height:200}}>
                <View style={{backgroundColor:'white',flex:2,borderRadius:20,padding:10}}>
                <Image 
                style={{width:'100%',height:'100%'}}
                source={require('../Image/PhotoIcon.png')}/>
                </View>
            </View>
            <View style={{flex:1}}>
              
            </View>
        </View>



        </View>
        <View style={{flex:1,}}>
        <View style={{flexDirection:'row',height:150,}}>
            <View style={{flex:1}}></View>
            <View style={{flex:1}}>
            </View>
            <View style={{flex:1,marginTop:40,}}>
              <View style={{backgroundColor:'white',width:60,height:60,padding:10,borderRadius:10}}>
              <TouchableOpacity onPress={()=> navigate('QrScreen',{
                IdPatient : this.state.IdPatient
              })}>
            <Image 
                style={{width:'100%',height:'100%',marginRight:10}}
                source={{
                  uri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+this.state.IdPatient,
                }}
                />
                </TouchableOpacity>
                </View>
            </View>
        </View>
        </View>
        <View style={{flex:2,paddingLeft:30,paddingRight:30,marginTop:10}}>

<View style={{height:60,flexDirection:'row'}}>
{/* <TouchableOpacity> */}
<View style={{flex:1}}></View>
<View style={{flex:5}}>
<LinearGradient colors={['#6857d6', '#876ae3', '#aa7ef3']} style={styles.linearGradient}>
  <TouchableOpacity onPress={ ()=> navigate('DailyNoteScreen') }>
  <Text style={styles.buttonText}>
    CATATAN HARIAN
  </Text>
  </TouchableOpacity>
</LinearGradient>
</View>
<View style={{flex:1}}></View>

{/* </TouchableOpacity> */}
</View>

<View style={{height:80,flexDirection:'row',marginTop:15}}>
{/* <TouchableOpacity> */}
<View style={{flex:1}}></View>
<View style={{flex:5}}>
<LinearGradient colors={['#6857d6', '#876ae3', '#aa7ef3']} style={styles.linearGradient}>
  <TouchableOpacity onPress={()=> navigate('PatientJourneyScreen')}>
  <Text style={styles.buttonText}>
    EPILEPSY FREE JOURNEY
  </Text>
  </TouchableOpacity>
</LinearGradient>
</View>
<View style={{flex:1}}></View>

{/* </TouchableOpacity> */}
</View>


        </View>
        
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
    marginTop:11,
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

export default HomeScreen;
