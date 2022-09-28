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
import { ScrollView } from 'react-native-gesture-handler';
import { HeadingBackgroundMenu } from '../component/HeadingBackgroundMenu';

const imagebg = { uri: "https://reactjs.org/logo-og.png" };
class MedicineReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date :  new Date(this.props.route.params.date),
      // this.props.route.params.date ,
      IdPatient : this.props.route.params.IdPatient,
      PatientName : this.props.route.params.PatientName,
      TimeEatMedicine : []
    };
  }


  componentDidMount = async () =>{
    let ApiGetSizure = global.Api + "Journey/GetDrugsConsumption?PatientID=" + this.state.IdPatient + "&&Date=" + this.props.route.params.date;
    console.log("ApiGetSizure = " + ApiGetSizure);
    await fetch(ApiGetSizure).then(
      Response => Response.json()
    ).then(
      json =>{
        // alert(JSON.stringify(json))
        this.setState({
          AvgDuration : json["AvgDuration"],
          SeizureCount : json["DrugsConsumptionCount"],
          IdMedicine : json["Id"]
        })

        let ApiEatMedicine = global.Api + "Journey/GetDetailDrugsConsumption?DrugsConsumptionID=" + json["Id"];
        console.log("ApiEat Medicine =" + ApiEatMedicine)

        fetch(ApiEatMedicine).then(
          Response => Response.json()
        ).then(
          json => {
            console.log(JSON.stringify(json))
            // alert(JSON.stringify(json))
            var arr = [];
            for (let index = 0; index < json.length; index++) {
              // const element = array[index];
              arr.push(json[index]['Time'])
            }

            this.setState({
              TimeEatMedicine : arr
            })
          }
        )

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
          <ImageBackground source={require("../Image/Patient_Background.png")} resizeMode="cover" style={styles.image}>
      
        <View style={{height:140}}>
        <HeadingBackgroundMenu nav={navigation}></HeadingBackgroundMenu>
        </View>
        <View style={{flex:2,paddingLeft:20,paddingRight:20,paddingTop:5}}>
        <View style={{backgroundColor:'white',height:210,borderRadius:20,padding:20}}>
        <Text style={{fontSize:22,color:'#6733ac',fontWeight:'bold',marginTop:20,marginBottom:10}}>LAPORAN Minum Obat</Text>
            <View style={{backgroundColor:'#f2f2f4',padding:20}}>
            <Text style={{fontSize:20,color:'#6733ac'}}>Minum Obat       : 
            {/* {this.state.date.getDate() } */}
            {" " + this.state.date.getDate() + " " + monthNames[this.state.date.getMonth()] + " " + this.state.date.getFullYear()  }
             </Text>
            <Text style={{fontSize:20,color:'#6733ac'}}>Frekuensi            : {this.state.SeizureCount}</Text>

            {/* <Text style={{fontSize:20,marginTop:20,color:'#6733ac'}}>Rata Rata Kejang Per Hari : </Text>
            <Text style={{fontSize:20,color:'#6733ac'}}>{this.state.AvgDuration} Kali</Text> */}
            </View>
        </View>


        </View>

        <View style={{flex:2,paddingLeft:30,paddingRight:30,marginTop:10,}}>

      <View style={{height:50,backgroundColor:'#ae80f5'}}>
          <Text style={{color:'white',fontSize:20,textAlign:'center',marginTop:10}}>Jam Minum Obat
          
          </Text>
      </View>

      {
        this.state.TimeEatMedicine.map((item,key)=>(
          <View style={{height:50,borderBottomColor:'#ae80f5',borderBottomWidth:1}}>
          <Text style={{color:'#ae80f5',fontSize:20,textAlign:'center',marginTop:10,fontWeight:'bold'}}> {this.state.TimeEatMedicine[key]} </Text>
      </View>
        ))
      }

      





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

export default MedicineReportScreen;
