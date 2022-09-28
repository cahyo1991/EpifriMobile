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
class DailyReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date :  new Date(this.props.route.params.date),
      // this.props.route.params.date ,
      IdPatient : this.props.route.params.IdPatient,
      PatientName : this.props.route.params.PatientName
    };
  }


  componentDidMount = async () =>{
    let ApiGetSizure = global.Api + "Journey/GetSeizure?PatientID=" + this.state.IdPatient + "&&Date=" + this.props.route.params.date;
    console.log("ApiGetSizure = " + ApiGetSizure);
    await fetch(ApiGetSizure).then(
      Response => Response.json()
    ).then(
      json =>{
        // alert(JSON.stringify(json))
        this.setState({
          AvgDuration : json["AvgDuration"]
        })
      }
    )
  }


  render() {
    const { navigate } = this.props.navigation;
    const {navigation} = this.props;
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    return (
        
      <View style={styles.container}>
          <ImageBackground source={require("../Image/LoginBackgroungPatient.png")} resizeMode="cover" style={styles.image}>
      
        <View style={{flex:1}}>
        <HeadingMenu nav={navigation}></HeadingMenu>
        </View>
        <View style={{flex:2,padding:40,}}>
        <View style={{backgroundColor:'white',height:210,borderRadius:20,padding:30}}>
          
            <Text style={{fontSize:17,color:'#6733ac'}}>Tanggal    : 
            {/* {this.state.date.getDate() } */}
            {" " + this.state.date.getDate() + " " + monthNames[this.state.date.getMonth()] + " " + this.state.date.getFullYear()  }
             </Text>
            <Text style={{fontSize:17,color:'#6733ac'}}>Pasien      : {this.state.PatientName}</Text>

            {/* <Text style={{fontSize:17,marginTop:20,color:'#6733ac'}}>Rata Rata Kejang Per Hari : </Text>
            <Text style={{fontSize:17,color:'#6733ac'}}>{this.state.AvgDuration} Kali</Text> */}
        </View>


        </View>

        <View style={{flex:2,paddingLeft:30,paddingRight:30,marginTop:10}}>

<View style={{height:80,flexDirection:'row'}}>
{/* <TouchableOpacity> */}
<View style={{flex:1}}></View>
<View style={{flex:5}}>
<LinearGradient colors={['#6857d6', '#876ae3', '#aa7ef3']} style={styles.linearGradient}>
  <TouchableOpacity onPress={ ()=> navigate('VideoReportScreen',{
    IdPatient : this.state.IdPatient,
    PatientName : this.state.PatientName,
    date : this.props.route.params.date
  }) }>
  <Text style={styles.buttonText}>
    LAPORAN
  </Text>
  <Text style={styles.buttonTextButtom}>
    Video / Kejang
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
  <TouchableOpacity onPress={ ()=> navigate('MedicineReportScreen',{
    IdPatient : this.state.IdPatient,
    PatientName : this.state.PatientName,
    date : this.props.route.params.date
  }) }>
  <Text style={styles.buttonText}>
    LAPORAN
  </Text>
  <Text style={styles.buttonTextButtom}>
    Konsumsi Obat  </Text>
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
  buttonTextButtom: {
    fontSize: 20,
    fontFamily: 'Roboto',
    textAlign: 'center',
    // marginTop:11,
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

export default DailyReportScreen;
