import React, { Component, useState } from 'react';
import { View, Text, StyleSheet,ImageBackground,TextInput,TouchableOpacity,Image,SafeAreaView,AsyncStorage } from 'react-native';
import { Heading } from '../component/Heading';
import BgLogin from '../Image/LoginBackgroungPatient.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import QR from '../Image/QR.png';
import { HeadingMenu } from '../component/HeadingMenu';
// import { Calendar } from 'react-native-toggle-calendar';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
const imagebg = { uri: "https://reactjs.org/logo-og.png" };

class PatientJourneyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MarkDate : [],
      DateList : [],
      // NamePatient : this.props.route.params.PatientName,
      DateMark :{'08-04-2021': {marked: true, selected: true}, '08-05-2021': {marked: true, selected: true}}
      //  {
      //   '2021-08-18': {selected: true, marked: true, selectedColor: 'blue'},
      //   '2021-08-19': {selected: true, marked: true, selectedColor: 'blue'},
      // }
      
      
    };
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

  componentDidMount = async () => {
    


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
          }
          
        }
      }
    )

    await fetch(global.Api + "Journey/GetJourneyCalendar?PatientId=" + this.state.IdPatient).then(
      Response => Response.json()
    ).then(
      json => {

        for (let index = 0; index < json.length; index++) {
          this.state.MarkDate.push(json[index]['Date']);
          this.state.DateList.push(json[index]['Date'])
        }

        
      }
    )

     let obj = await this.state.MarkDate.reduce((c, v) => Object.assign(c, {[v]: {selected: true,marked: true}}), {});
     console.log(obj)
    this.setState({ marked : obj});

  }

  checkDate = (Date) =>{
    let check = false;
    // fetch(global.Api + "Journey/GetJourneyCalendar?PatientId=" + this.state.IdPatient).then(
    //   Response => Response.json()
    // ).then(
    //   json => {

    //     for (let index = 0; index < json.length; index++) {
    //       this.state.MarkDate.push(json[index]['Date']);
    //       if (json[index]['Date'] == Date) {
    //           check = true;
    //       } else {
    //         check = false;
    //         console.log("Data Calendar =" + Date + " Date Respon = "  + json[index]['Date'])
    //       }
    //     }

        
    //   }
    // )
    for (let index = 0; index < this.state.DateList.length; index++) {
      // const element = array[index];
      if (this.state.DateList[index] == Date) {
          check = true;
      }
      
    }
    return check;
  }

  render() {
      
    const { navigate } = this.props.navigation;
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
      <ImageBackground source={require("../Image/Patient_Background2.png")} resizeMode="cover" style={styles.image}>
    
    <View style={{flex:1}}>
    <HeadingMenu nav={navigation}></HeadingMenu>
    </View>
    
    <View style={{height:20,marginTop:10}}>
    {/* <Text style={{fontSize:35,textAlign:'center',color:'white',fontWeight:'bold'}}>Scan QR Code Ini</Text> */}
    </View>
    
    <View style={{flex:3,paddingLeft:30,paddingRight:30}}>
    
    <SafeAreaView style={{height:400,padding:10,backgroundColor:'white',borderRadius:10}}>
 <Calendar
 onDayPress={(res)=> 
//   navigate('DailyReportScreen',{
//    date : res["dateString"],
//    IdPatient : this.state.IdPatient,
//    PatientName : this.state.PatientName
//  })
{
  if (this.checkDate(res["dateString"]) == true) {
    navigate('DailyReportScreen',{
      date : res["dateString"],
      IdPatient : this.state.IdPatient,
      PatientName : this.state.PatientName
    })      
  } else {
      console.log("Date Not Found")
  }
} 
}
 markedDates={
   this.state.marked
  // '2021-08-18': {selected: true, marked: true, selectedColor: 'blue'},
}
 />
</SafeAreaView>
    
    <View style={{flexDirection:'row'}}>
        <View style={{flex:1}}></View>
        <View style={{flex:4}}>
        <View style={{height:70,marginTop:40}}>   
<LinearGradient colors={['#ffffff', '#ffffff', '#ffffff']} style={styles.linearGradient}>
    <Text style={styles.buttonTextAkun}>
    EPILEPSY FREE 
    </Text>
    <Text style={styles.buttonTextAkun}>
    JOURNEY 
    </Text>

    </LinearGradient>
    </View>
        </View>
        <View style={{flex:1}}></View>
    </View>
    

  
    
    </View>
    
    
    <View style={{flex:2,paddingLeft:30,paddingRight:30,marginTop:90}}>
    
    
    
    <View style={{height:60,flexDirection:'row',marginTop:20}}>
    {/* <TouchableOpacity> */}
    <View style={{flex:1}}></View>
    <View style={{flex:3}}>
    {/* <LinearGradient colors={['#ffffff', '#ffffff', '#ffffff']} style={styles.linearGradient}>
    <TouchableOpacity
    onPress={()=> navigate('PatientScreen')}
    >
    <Text style={styles.buttonTextAkun}>
    USER
    </Text>
    </TouchableOpacity>
    </LinearGradient> */}
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
  paddingTop:7,
  borderRadius: 15,
  borderColor:'#662d91',
  borderWidth:1,

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
  fontSize: 20,
  fontFamily: 'Roboto',
  textAlign: 'center',
  
  color: '#662d91',
  fontWeight:'bold',
  backgroundColor: 'transparent',
},
});

export default PatientJourneyScreen;
