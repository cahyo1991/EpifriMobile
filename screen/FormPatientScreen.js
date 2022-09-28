import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground,TextInput,TouchableOpacity, ScrollView,SafeAreaView,
  ActivityIndicator,AsyncStorage } from 'react-native';
import { Heading } from '../component/Heading';
import BgLogin from '../Image/LoginBackgroungPatient.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,CheckBox } from 'react-native-elements';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { HeadingBackground } from '../component/HeadingBackground';
import { HeadingBackgroundMenu } from '../component/HeadingBackgroundMenu';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import DatePicker from 'react-native-datepicker'
import { AlertError } from '../component/AlertError';
import { AlertSuccess } from '../component/AlertSuccess';
const imagebg = { uri: "https://reactjs.org/logo-og.png" };
class FormPatientScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName : '',
      Email : '', 
      Nama : '',
      TanggalLahir : '01-01-1991',
      JenisKelamin : '',
      TempatKonsultasi : '',
      date:"",
      FormValidation : 2,
      showAlertError : false,
      showAlertSuccess : false,
      ShowLoading : false,
      ErrorMessage :  "",
      SuccessMessage : "",
      Type : this.props.route.params.Type,
      DisableForm : this.props.route.params.DisableForm,
      IdPatient : this.props.route.params.IdPatient,
      ReferalCode : '',
      Obat : 'Epifri',
      checkedObat : false
    };
  }


  getPatientDetail =  () =>{
  
      const ApiGetPatientDetail = global.Api + "Patient/GetDetailPatient?PatientID=" + this.state.IdPatient;
      fetch(ApiGetPatientDetail).then(
        Response => Response.json()
      ).then(
        json =>{
          // alert(JSON.stringify(json))
        


            this.setState({
              Nama : json['FirstName'],
              TanggalLahir : json['DOB'],
              JenisKelamin : json['Gender'],
              TempatKonsultasi : json['ConsultationPlace']
            })
            
          
        }
      )
  }

  componentDidMount= async () =>{
 
    // console.log("tester")
    await this._retrieveData('FirstName');
    await this._retrieveData('Email');
    await this._retrieveData('UserID');
    if (this.state.Type == "Info" || this.state.Type == "Update") {
      await  this.getPatientDetail();  
    }
    
}

  _retrieveData = async (Name) => {
    try {
      const value = await AsyncStorage.getItem(Name);
      if (value !== null) {
        // We have data!!
        this.setState({
          [Name] : value
        })
          
        console.log("datanya async = " + value);
      }
    } catch (error) {
      // Error retrieving data
    }
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

  cekFormValidation = ()=>{
    if(this.state.Nama!="" &&this.state.JeniKelamin!=""
    &&this.state.TempatKonsultasi!="" && this.state.ReferalCode!="" && this.state.Obat!=""){
      this.setState({
        FormValidation : true
      })
    }
  }

  SavePatient = () =>{
    const statForm = this.state.FormValidation;
    
    if(statForm == true){
      this.setState({
        ShowLoading : true
      });
      
      let Api  = "";
      let ApiDrugs = "";

    if (this.state.Type == "Update") {

      Api = global.Api + "Patient/UpdatePatient?UserID="+this.state.UserID+"&&FirstName="+this.state.Nama
      +"&&LastName=-&&DOB="+this.state.TanggalLahir+"&&Gender="+this.state.JenisKelamin+
      "&&ConsultationPlace="+this.state.TempatKonsultasi+"&&PatientID="+this.state.IdPatient;

      

    }else{
        Api = global.Api + "Patient/CreatePatient?UserID="+this.state.UserID+"&&FirstName="+this.state.Nama
        +"&&LastName=-&&DOB="+this.state.TanggalLahir+"&&Gender="+this.state.JenisKelamin+
        "&&ConsultationPlace="+this.state.TempatKonsultasi+"&&ReferalCode="+this.state.ReferalCode.substring(2,4);
    
        
      // alert(ApiDrugs)
      // fetch(ApiDrugs).then(
      //   Response => Response.json()
      // ).then(
      //   json => {
      //     console.log("Response Drugs ",json);
      //   }
      // )
    
      }                   
                   
                   console.log("Api Save =" + Api);
                   fetch(Api).then(
                    Response => Response.json()
                  ).then(
                    json => {
                      const Status = json['Status'] ;
                      const Message = json['Message'];
                      // alert(JSON.stringify(json))


                      if(this.state.Type!='Update'){
                        ApiDrugs = global.Api + "Patient/InsertPatientDrugs?PatientID="+Message+"&&DrugsName="+this.state.Obat;
                        // alert(ApiDrugs)
                        console.log("Api Drugs =" + ApiDrugs)
                        fetch(ApiDrugs).then(
                          Response => Response.json()
                        ).then(
                          json => {
                            console.log("Response Drugs ",json)
                          }
                        )
                      }

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
                        this.setState({
                          SuccessMessage : Message
                        })
                        setTimeout(()=>{
                          this.showAlertSuccess();
                          this.setState({
                            ShowLoading : false
                          })

                          this.props.navigation.navigate('PatientScreen',{
                            ReloadPage : true
                          })

                        },2000)
                
                
                      }
                    }
                  )

    }else{
      this.setState({
        FormValidation : false
      })
    }
  }


  render() {
    const state = this.state;
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const {cekFormValidation} = this;
    const {SavePatient} = this;
    return (
        
      <View style={styles.container}
      pointerEvents = {
        this.state.DisableForm ? "none" : "auto"
      }
      >
          <ImageBackground source={require("../Image/Patient_Background.png")} resizeMode="cover" style={styles.image}>
        <View style={{flex:1}}>
        <HeadingBackgroundMenu nav={navigation}></HeadingBackgroundMenu>
        </View>
      
        <View style={{flex:5,paddingLeft:30,paddingRight:30,marginTop:20}}>
            <SafeAreaView>
            <ScrollView>
            <Text style={styles.text}>Halo, Ayah/Ibu  <Text> {this.state.FirstName} </Text></Text> 
            <Text style={styles.text}>Mohon Melengkapi data pasien : </Text>
            <View style={{height:1,backgroundColor:'#e3e3e3',marginTop:10,marginBottom:10}}></View> 

       {/* input dan label */}
       <Text style={{fontSize : 20,marginTop:20,color:'#662d91'}}>Nama *</Text>
            <View style={{backgroundColor:'#f2f2f4',height:60,marginTop:5}}>
            <Input
            style={{paddingTop:15}}
              inputContainerStyle={{borderBottomWidth:0}}
  placeholder=''
  onChangeText={
    (res)=>{
      this.setState({
        Nama : res
      },()=>{
        cekFormValidation()
      })
    }
  }
  value = {this.state.Nama}
/>
            </View>
            {
              this.state.Nama == '' && this.state.FormValidation == false   ? <Text style={styles.textValidation}>Nama Harus Diisi !</Text> 
              : <Text></Text>
            }
            {/* input dan label */}
                 {/* input dan label */}
       <Text style={{fontSize : 20,marginTop:20,color:'#662d91'}}>Tanggal Lahir *</Text>
            <View style={{backgroundColor:'#f2f2f4',height:60,marginTop:5}}>
            <DatePicker
        style={{width: 200}}
        date={this.state.TanggalLahir}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate="01-01-1991"
        maxDate="01-01-2022"
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
        onDateChange={(date) => {this.setState({TanggalLahir: date})}}
      />
            </View>
            {/* input dan label */}
                 {/* input dan label */}
{
  this.state.ShowLoading ?
<ActivityIndicator size="large" color="#662d91"  style={styles.loading}/> : 
<View></View>
}
                 

       <Text style={{fontSize : 20,marginTop:20,color:'#662d91'}}>Jenis Kelamin *</Text>
            <View style={{backgroundColor:'#f2f2f4',height:60,marginTop:5}}>
            <Input
            style={{paddingTop:15}}
              inputContainerStyle={{borderBottomWidth:0}}
  placeholder=''
  onChangeText={
    (res) => {
      this.setState({
        JenisKelamin : res
      },()=>{
        cekFormValidation()
      })
    }
  }
  value = {this.state.JenisKelamin}
/>
            </View>
            {
              this.state.JenisKelamin == '' && this.state.FormValidation == false   ? <Text style={styles.textValidation}>Jenis Kelamin Harus Diisi !</Text> 
              : <Text></Text>
            }

<Text style={{fontSize : 20,marginTop:20,color:'#662d91'}}>Referal Code *</Text>
            <View style={{backgroundColor:'#f2f2f4',height:60,marginTop:5}}>
            <Input
            style={{paddingTop:15}}
              inputContainerStyle={{borderBottomWidth:0}}
  placeholder=''
  onChangeText={
    (res) => {
      this.setState({
        ReferalCode :  res
      },()=>{
        cekFormValidation()
      })
    }
  }
  value = {this.state.ReferalCode}
/>
            </View>
            {
              this.state.ReferalCode == '' && this.state.FormValidation == false   ? <Text style={styles.textValidation}>Referal Code Harus Diisi !</Text> 
              : <Text></Text>
            }



            {/* input dan label */}
                 {/* input dan label */}
                 <Text style={{fontSize : 20,marginTop:20,color:'#662d91'}}>Obat Yang Di Gunakan *
       </Text>
       <CheckBox
  title='Lainnya'
  checked={this.state.checkedObat}
  onPress={() => this.setState({checkedObat: !this.state.checkedObat})}

/>
            <View style={{backgroundColor:'#f2f2f4',height:60,marginTop:5}}>
            
            <Input
            editable={this.state.checkedObat}
            style={{paddingTop:15}}
              inputContainerStyle={{borderBottomWidth:0}}
  placeholder=''
  onChangeText = {
    (res) => {
      this.setState({
        Obat : res
      },()=>{
        cekFormValidation()
      })
    }
  }
  value = {this.state.Obat}
/>
            </View>
            {
              this.state.Obat == '' && this.state.FormValidation == false   ?
               <Text style={styles.textValidation}>Obat Harus Diisi !</Text> 
              : <Text></Text>
            }
            {/* input dan label */}






            {/* input dan label */}
                 {/* input dan label */}
       <Text style={{fontSize : 20,marginTop:20,color:'#662d91'}}>Tempat Konsultasi *
       </Text>
            <View style={{backgroundColor:'#f2f2f4',height:60,marginTop:5}}>
            <Input
            style={{paddingTop:15}}
              inputContainerStyle={{borderBottomWidth:0}}
  placeholder=''
  onChangeText = {
    (res) => {
      this.setState({
        TempatKonsultasi : res
      },()=>{
        cekFormValidation()
      })
    }
  }
  value = {this.state.TempatKonsultasi}
/>
            </View>
            {
              this.state.TempatKonsultasi == '' && this.state.FormValidation == false   ?
               <Text style={styles.textValidation}>Tempat Konsultasi Harus Diisi !</Text> 
              : <Text></Text>
            }
            {/* input dan label */}

            <View style={{height:60,marginBottom:20,marginTop:20}}>
            <LinearGradient colors={['#6857d6', '#876ae3', '#aa7ef3']} style={styles.linearGradient}>
<TouchableOpacity
onPress={() => SavePatient()}
>
  <Text style={styles.buttonText}>
    KIRIM
  </Text>
  </TouchableOpacity>
</LinearGradient>
</View>

            </ScrollView>
            </SafeAreaView>
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
      color: "#64298f",
      fontSize: 20,
      

    },
    textValidation : {
      fontSize:15,color:'red',fontStyle:'italic'
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
    top: -100,
    bottom: 0,
    zIndex : 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  });

export default FormPatientScreen;
