import React, { Component } from 'react';
import { Image,PermissionsAndroid, View, Text, StyleSheet,ImageBackground,TextInput,TouchableOpacity, ScrollView,SafeAreaView,AsyncStorage,
ActivityIndicator
} from 'react-native';
import { Heading } from '../component/Heading';
import BgLogin from '../Image/LoginBackgroungPatient.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { HeadingBackground } from '../component/HeadingBackground';
import { HeadingBackgroundMenu } from '../component/HeadingBackgroundMenu';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import DateTimePicker from '@react-native-community/datetimepicker';
import CameraRoll from "@react-native-community/cameraroll";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'
import Video from 'react-native-video';
const imagebg = { uri: "https://reactjs.org/logo-og.png" };
class DailyNoteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      JumlahKejang : [],
      JumlahMinumObat : [],
      ListImageVideo : [],
      ListImageVideotype : [],
      ListImageVideoFileName : [],
      ShowTime0 : false,
      ShowTime1 : false,
      ShowTime2 : false,
      ShowTime3 : false,
      ShowTime4 : false,
      ShowTime5 : false,
      ShowTime6 : false,
      ShowTime7 : false,
      ShowTime8 : false,
      ShowTime9 : false,
      ShowLoading : false,
      RataKejang : 1
      
      // FullDay : new Date()
      
      // tableHead: ['Nama Pasien', 'Aksi'],
      // tableData: [
      //   ['Cahyo Prabowo', 'HAPUS | UPDATE'],
      //   ['Dhika Prathama', 'HAPUS | UPDATE'],
      // ]
      
    };
  }

  hasAndroidPermission = async () =>{
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    
  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
  }

  savePicture = async () =>{
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
  
    CameraRoll.save(tag, { type, album })
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
    



    await this.hasAndroidPermission();
    await this._retrieveData('FirstName');
    await this._retrieveData('Email');
    await this._retrieveData('UserID');
    // await this._retrieveData('Idpatient');

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

    // alert(this.state.IdPatient)

  }







  pushStateJumlahKejang(val){

    // this.setState({
    //   JumlahKejang : []
    // })
      for (let index = 0; index < val; index++) {
          this.state.JumlahKejang.push(index);
      }

      // alert(JSON.stringify(this.state.JumlahKejang))
  }

  _handleButtonPress = () => {
    // alert("Tester")
    CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
         //Error Loading Images
      });
    };


    uploadPicture = (SeizureId) =>{
      for (let index = 0; index < this.state.ListImageVideo.length; index++) {
      this.setState({
        spinner : true
      })
      
    var self = this;
        const data = new FormData();
        // data.append('file', 'file'); // you can append anyone.
        data.append('file', {
          uri: this.state.ListImageVideo[index],
          type: this.state.ListImageVideoFileName[index].substring(0,5) == "video" ? 'video/mp4' : this.state.ListImageVideotype[index] , // or photo.type
          name: this.state.ListImageVideoFileName[index].substring(0,5) == "video" ? this.state.ListImageVideoFileName[index]+".mp4" : this.state.ListImageVideoFileName[index]  
    
        });
        fetch(global.Api + "Upload/UploadFile", {
          method: 'post',
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          },
          body: data
        }).
        then((response) => response.json())
        .then(data=>{
          // console.log("uri json =" + this.state.ListImageVideotype[index])
          // alert(JSON.stringify(data) )
          let NameVideo = data["message"];
          
          let ApiUploadImageVideo = global.Api + "Journey/CreateSeizureVideo?SeizureId=" + SeizureId + "&&FileName=" + NameVideo;
          fetch(ApiUploadImageVideo).then(
            Response => Response.json()
          ).then (
            json =>{
              console.log("Result Upload Video Seizure",json);
            }
          )
          
          
        }).catch(
          function(error){
            self.setState({
              spinner : false
            })
            alert(error.message)
            
          })

        }
    }

     openGallery = () => {
      const options = {
      storageOptions: {
      path: 'movies'
      
      },
      mediaType: 'mixed',
      includeBase64: true,
      };
      
      launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
      console.log('User cancelled image picker');
      } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      } else {
      // You can also display the image using data:
      // alert(JSON.stringify(response.assets[0]['uri']))
      // const source = {uri: 'data:image/jpeg;base64,' + response.base64};
      console.log("Uri Asset = " + response.assets[0]['fileName'].substring(0,5) );
      this.state.ListImageVideo.push(response.assets[0]['uri']);
      this.state.ListImageVideotype.push(response.assets[0]['type']);
      this.state.ListImageVideoFileName.push(response.assets[0]['fileName']);
      this.setState({
        VideoImage : response.assets[0]['uri'],
      })
      // setimageUriGallary(source);
      }
      });
      };

//     openCamara  =() =>{
//       const options = {
//         storageOptions: {
//         path: 'images',
//         mediaType: 'video ',
//         },
//         includeBase64: true,
//         };
        
//         launchCamera(options, response => {
//         console.log('Response = ', response);
//         if (response.didCancel) {
//         // alert('User cancelled image picker');
//         } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//         } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         } else {
//         // You can also display the image using data:
//         let source = {uri: 'data:image/jpeg;base64,' + response.base64};
//         // setimageUri(source);
//         // alert(response.base64);
//         // this.setState({
//         //   VideoImage : source
//         // })


//         }
//         });
// }



CreateSeizure = (PatientID,Date,SeizureCount) =>{
  let Param = "?PatientID=" + PatientID + "&&Date=" + Date + "&&SeizureCount=" + SeizureCount+"&&AvgDuration="+this.state.RataKejang;
  let ApiCreateSeizure = global.Api + "Journey/CreateSeizure" + Param;
  console.log("ApiCreateSeizure =" + ApiCreateSeizure)
  fetch(ApiCreateSeizure).then(
    Response => Response.json()
  ).then(
    json => {
      let Id = json["Message"];
      
      this.uploadPicture(Id);
      for (let index = 0; index < SeizureCount; index++) {
        let JamMinumObat = "DurasiKejang" + index; 
        
        let Time = this.state[JamMinumObat];
        let ApiCreateSeizureDetail = global.Api + "Journey/CreateSeizureDetail?SeizureId="+Id+"&&Time="+Time;
        console.log("Api Seizure Detail" + ApiCreateSeizureDetail);        
        fetch(ApiCreateSeizureDetail).then(
          Response => Response.json()
        ).then(
          json => {
            console.log(JSON.stringify(json))
          }
        )
        
      }
  
      
    }
  )
  }



CreateDrugsConsumption = (PatientID,Date,DrugsConsumptionCount) =>{
  this.setState({
    ShowLoading : true
  })
let Param = "?PatientID=" + PatientID + "&&Date=" + Date + "&&DrugsConsumptionCount=" + DrugsConsumptionCount;
let ApiCreateDrugsConsumption = global.Api + "Journey/CreateDrugsConsumption" + Param;
fetch(ApiCreateDrugsConsumption).then(
  Response => Response.json()
).then(
  json => {
    let Id = json["Message"];
    
    for (let index = 0; index < DrugsConsumptionCount; index++) {
      let JamMinumObat = "JamMinumObat" + index; 
      
      let Time = this.state[JamMinumObat];
      let ApiDetailDrugsConsumption = global.Api + "Journey/CreateDrugsConsumptionDetail?DrugsConsumptionId="+Id+"&&Time="+Time;
      
      fetch(ApiDetailDrugsConsumption).then(
        Response => Response.json()
      ).then(
        json => {
          console.log(JSON.stringify(json))
        }
      )
      
    }

    
  }
)
}

SaveData = () =>{

  var IdPatient = this.state.IdPatient;
  this.CreateDrugsConsumption(
    IdPatient,this.state.Tanggal,this.state.JumlahMinumObat.length
  )
  
  this.CreateSeizure(
    IdPatient,this.state.Tanggal,this.state.JumlahKejang.length
  )

  setTimeout(()=>{
    this.setState({
      ShowLoading : false
    })
  alert("Data Berhasil Disimpan !");
  this.props.navigation.navigate('HomeScreen')
  },3000)




}




  render() {
    const state = this.state;
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    // const theday = new Date();
    // const time = theday.getTime().toString();
    
    return (
        
      <View style={styles.container}
      pointerEvents = {
        this.state.ShowLoading ? "none" : "auto"
      }
      >
          <ImageBackground source={require("../Image/Patient_Background.png")} resizeMode="cover" style={styles.image}>
        <View style={{flex:1}}>
        <HeadingBackgroundMenu nav={navigation}></HeadingBackgroundMenu>
        </View>
      
        <View style={{flex:5,paddingLeft:30,paddingRight:30,marginTop:20}}>
            <SafeAreaView>
            <ScrollView>
            <Text style={styles.text}>Halo, Ayah/Ibu  {this.state.FirstName}
            
            </Text> 
            {/* <View style={{height:70,backgroundColor:'#ae80f5',marginTop:20,marginBottom:10,flexDirection:'row',padding:5}}>
                <View style={{flex:1,borderRightColor:'white',borderRightWidth:1}}>
                    <Text style={{color:'white',textAlign:'center',fontSize:20}}>Waktu</Text>
                    <Text style={{color:'white',textAlign:'center',fontSize:20}}>Kejang</Text>
                </View>
                <View style={{flex:1,}}>
                <Text style={{color:'white',textAlign:'center',fontSize:20}}>Waktu</Text>
                    <Text style={{color:'white',textAlign:'center',fontSize:20}}>Minum Obat</Text>
                </View>
            </View>  */}


            {/* <View style={{height:60,marginTop:10,marginBottom:10,flexDirection:'row'}}>
                <View style={{flex:1,backgroundColor:'#f2f2f4'}}>
                <Input
            style={{paddingTop:15}}
              inputContainerStyle={{borderBottomWidth:0}}
  placeholder=''
/>



                </View>
                <View style={{width:15}}></View>
                <View style={{flex:1,backgroundColor:'#f2f2f4'}}>
                <Input
            style={{paddingTop:15}}
              inputContainerStyle={{borderBottomWidth:0}}
  placeholder=''
/>
                </View>
            </View>  */}


<Text style={{fontSize : 18,marginTop:20,color:'#662d91'}}>Tanggal *

       </Text>

       <View style={{backgroundColor:'#f2f2f4',height:60,marginTop:5}}>
       <DatePicker
        style={{width: 200}}
        date={this.state.Tanggal}
        mode="date"
        placeholder="Date"
        format="YYYY-MM-DD"
        minDate="1991-01-01"
        maxDate="2022-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon = {false}
        allowFontScaling = {true}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            // marginLeft: 36,
            borderWidth:0,
            fontSize:20,
            marginLeft:-50,
            marginTop:20
          },
          dateText : {
            fontSize:20
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({Tanggal: date})}}
      />
            </View>






       {/* input dan label */}
       {/* <Text style={{fontSize : 18,marginTop:20,color:'#662d91'}}>Rata-rata Kejang Per Hari *
       </Text>
            <View style={{backgroundColor:'#f2f2f4',height:60,marginTop:5}}>
            <Input
            style={{paddingTop:15}}
              inputContainerStyle={{borderBottomWidth:0}}
  placeholder=''
  onChangeText = {
    (res)=>{
      this.setState({
        RataKejang: res,
      });
    }
  }
/>
            </View> */}

            {
            this.state.ShowLoading ?
            <ActivityIndicator size="large" color="#662d91"  style={styles.loading}/> 
            : <View></View>

          }

       <Text style={{fontSize : 18,marginTop:20,color:'#662d91'}}>Jumlah Kejang  *
       </Text>
            <View style={{backgroundColor:'#f2f2f4',height:60,marginTop:5}}>
            <Input
            style={{paddingTop:15}}
              inputContainerStyle={{borderBottomWidth:0}}
  placeholder=''
  onChangeText = {
    (res)=>{
      var arr = [];
      for (let index = 0; index < res; index++) {
        arr.push(index); 
      }
      this.setState({
        JumlahKejang: arr,
      });
    }
  }
/>
            </View>
            {/* <this.ViewJumlahKejang/> */}
            
            { this.state.JumlahKejang.map((item, key)=>(
        //  <Text key={key} > { item } </Text>
         
         <View key={key}>
             <Text style={{fontSize : 18,marginTop:20,color:'#662d91'}}>Rata-rata durasi kejang {key+1} *</Text>
       <View style={{flexDirection:'row'}}>
           <View style={{flex:4}}>
            <View style={{backgroundColor:'#f2f2f4',height:60,marginTop:5}}>
            <Input
            style={{paddingTop:15}}
              inputContainerStyle={{borderBottomWidth:0}}
  placeholder=''
  onChangeText = {
    (res)=>{
        let DurasiKejang = "DurasiKejang" + key;
        this.setState({
          [DurasiKejang] : res
        })
    }
  }
/>
            </View>
            </View>

            <View style={{flex:2,padding:10}}>
                <Text style={{fontSize:20,fontWeight:'bold',color:'#512ea3',marginTop:10,marginLeft:15}}>Menit</Text>
            </View>
    </View>
            {/* input dan label */}
                 {/* input dan label */}
         </View>
         
         )
         )}


   {/* Rata Durasi Kejang */}
       <Text style={{fontSize : 18,marginTop:20,color:'#662d91'}}>Berapa kali minum obat hari ni </Text>
            <View style={{backgroundColor:'#f2f2f4',height:60,marginTop:5}}>
            <Input
            style={{paddingTop:15}}
              inputContainerStyle={{borderBottomWidth:0}}
  placeholder=''
  onChangeText = {
    (res)=>{
      var arr = [];
      for (let index = 0; index < res; index++) {
        arr.push(index); 
      }
      this.setState({
        JumlahMinumObat: arr,
      });
    }
  }
/>
            </View>
            {/* input dan label */}
                 {/* input dan label */}
                 { this.state.JumlahMinumObat.map((item, key)=>(
                  <View key={key}>
      <Text style={{fontSize : 18,marginTop:20,color:'#662d91'}}>Jam minum obat {key+1}*</Text>

<View style={{backgroundColor:'#f2f2f4',height:60,marginTop:5}}>
  {
    
    this.state["ShowTime"+key] &&(
<DateTimePicker
          testID={"dateTimePicker"+key} 
          value={new Date()}
          mode= "time"
          is24Hour={true}
          display="clock"
          onChange={
            (res)=>{
              let JamMinumObat = "JamMinumObat" + key; 
              let st = "ShowTime" + key;
              let Time = ("0" + res["nativeEvent"]["timestamp"].getHours()).slice(-2)  + ":" + res["nativeEvent"]["timestamp"].getMinutes();  
                console.log("Time =" + Time) 
                // alert(key)
                this.setState({
                  [st] : false,
                  [JamMinumObat] : Time
                })
            }
          }
        />
    )
  }

<Button
 onPress={()=>{
  let a = "ShowTime" + key;
    this.setState({
      // [JamMinumObat] : res,
      [a] : true
    })
}} title={
  this.state["JamMinumObat"+key] ? this.state["JamMinumObat"+key]  : "Clock Picker" 
} />
{/* <Input
style={{paddingTop:15}}
  inputContainerStyle={{borderBottomWidth:0}}
placeholder=''
onPressIn = {
  (res) => {
    
    this.setState({
      // [JamMinumObat] : res,
      ShowTime : true
    })
  }
}
/> */}
</View>
{/* input dan label */}
                  </View>
                 ))}
 

<View style={{flexDirection:'row',height:40,marginTop:20,marginBottom:5}}>

    <View style={{flex:1}}>
        <Text style={{fontSize : 18,color:'#662d91'}}>UPLOAD Video/Foto</Text>
    </View>
    <View style={{width:140}}>
    <LinearGradient colors={['#6857d6', '#876ae3', '#aa7ef3']} style={styles.linearGradientSmall}>
      <TouchableOpacity
      onPress={
        ()=>{
    this.openGallery()      
          // CameraRoll.getAlbums()
          // launchCamera()
        }
      }
      >
  <Text style={styles.buttonTextSmall}>
    Tambah Video
  </Text>
  </TouchableOpacity>
</LinearGradient>
    </View>


</View>

<View style={{height:1.5,backgroundColor:'#b68cf6',marginTop:10,marginBottom:10}}></View>

<View
style={{
  height : 100,
  // backgroundColor : 'red'
}}
>
  <ScrollView>
  { this.state.ListImageVideo.map((item, key)=>(
              <View style={{flex:1,flexDirection:'row',marginBottom:3}}>
              <View style={{flex: 3,}}>
              <Text style={{fontSize : 18,color:'#662d91'}}>Video/Foto {key+1}</Text>
              </View>
              <View style={{flex: 3,}}>
                <TouchableOpacity
                  onPress= {
                    ()=>{
                      // let arr = this.state.ListImageVideo;
                      // alert(key);
                      this.state.ListImageVideo.splice(key,1);
                      this.state.ListImageVideoFileName.splice(key,1);
                      this.state.ListImageVideotype.splice(key,1);
                      this.setState({
                        ListImageVideo : this.state.ListImageVideo,
                        ListImageVideotype : this.state.ListImageVideotype,
                        ListImageVideoFileName : this.state.ListImageVideoFileName
                      })
                    }
                  }
                >
                <Text style={{fontSize : 18,color:'#662d91',fontStyle:'italic'}}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
            ))}


  </ScrollView>

</View>


            <View style={{height:60,marginBottom:20,marginTop:20}}>
            <LinearGradient colors={['#6857d6', '#876ae3', '#aa7ef3']} style={styles.linearGradient}>
      <TouchableOpacity
      onPress= {
        ()=>{
          this.SaveData()
        }
      }
      >
  <Text style={styles.buttonText}>
    SIMPAN
  </Text>
  </TouchableOpacity>
</LinearGradient>
</View>

            </ScrollView>
            </SafeAreaView>
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
      color: "#64298f",
      fontSize: 17,
      

    },
    searchSection: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding:30,
  },

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    borderColor:'#662d91',
    borderWidth:1
  },
  linearGradientSmall: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
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
    fontWeight:'bold'
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
  buttonTextSmall: {
    fontSize: 13,
    fontFamily: 'Roboto',
    textAlign: 'center',
    margin: 8,
    color: '#ffffff',
    backgroundColor: 'transparent',
    // fontWeight:'bold'
  },

  });

export default DailyNoteScreen;
