import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground,TextInput,TouchableOpacity,AsyncStorage,
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
import { AlertSuccess } from '../component/AlertSuccess';
import { AlertError } from '../component/AlertError';

const imagebg = { uri: "https://reactjs.org/logo-og.png" };
class PatientScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Nama Pasien', 'Aksi'],
      widthArr: [120, 240],
      ShowLoading : false,
      showAlertError : false,
      showAlertSuccess : false,
      ErrorMessage : '',
      SuccessMessage : '',

      // tableData: Array()
    };
  }

  UpdateActive =  (Id) =>{
    this.setState({
      ShowLoading : true
    })  
    const ApiUpdateActiveUser = global.Api + "Patient/UpdateActivePatient?UserID=" + this.state.UserID +
    "&&PatientId=" + Id ;
    fetch(ApiUpdateActiveUser).then(
      Response => Response.json()
    ).then(
      json => {
        const Status = json['Status'] ;
        const Message = json['Message'];

        if (Status == "True") {
          
          this.setState({
            SuccessMessage : Message
          })

          setTimeout(()=>{
            this.setState({
              showAlertSuccess : true,
              ShowLoading : false
            })

            this.getPatient();
            
          },3000)

          setTimeout(()=>{
            this.props.navigation.navigate("PatientScreen");
          },5000)

        }else{
          

          
          setTimeout(()=>{
          
            alert(Message);
            this.setState({
              
              ShowLoading : false
            })
            
          },3000)

        }

      }
    )
  }


  DeletePatient =  (Id) =>{
    this.setState({
      ShowLoading : true
    })
    const ApiUpdateActiveUser = global.Api + "Patient/DeletePatient?UserID=" + this.state.UserID +
    "&&PatientId=" + Id ;
    fetch(ApiUpdateActiveUser).then(
      Response => Response.json()
    ).then(
      json => {
        const Status = json['Status'] ;
        const Message = json['Message'];

        if (Status == "True") {
          
          this.setState({
            SuccessMessage : Message
          })

          setTimeout(()=>{
            this.setState({
              showAlertSuccess : true,
              ShowLoading : false
            })

            this.getPatient();
          },3000)

          setTimeout(()=>{
            this.props.navigation.navigate("PatientScreen");
          },5000)

        }else{
          

          
          setTimeout(()=>{
          
            alert(Message);
            this.setState({
              
              ShowLoading : false
            })
            
          },3000)

        }

      }
    )
  }



  getPatient = async () => {
    const ApiGetPatient = await global.Api + "Patient/GetPatient?UserId=" + this.state.UserID;
    console.log(ApiGetPatient)
    await fetch(ApiGetPatient).then(
      Response => Response.json()
    ).then(
      json =>{
const myArray= [];
const r = 0; 
const rows = json.length;
const cols = 2;

console.log(
  "Data Pasien",json
);

if (json[0]['FirstName'] !='') {
  


for( let z=r; z<rows; z++ ) {
  myArray.push( [] );
}

for (let l = 0; l< rows; l++)
{
     for (let j =  myArray[l].length; j < cols; j++)
    {
      if(j == 0){
        myArray[l].push( 
          this.ButtonName(
          json[l]['FirstName'],json[l]['IsActive'],json[l]['Id']) );
      }else{
        myArray[l].push(
            this.ButtonInfo(
              json[l]['FirstName'],json[l]['IsActive'],json[l]['Id'])
              
            ) ;
      }
    }
    
}


this.setState({
  tableData : myArray
})

console.log('Array',myArray)


}
        
      }
    )

  }

   ButtonName = (value,IsActive,IdPatient) => (
     
    <TouchableOpacity onPress={() => this.UpdateActive(IdPatient) }>
        <Text style={{fontSize:15,margin:6,color:'#a37ec2',
        fontWeight : IsActive == '1'  ? 'bold' : 'normal'
        }}>{value} </Text>
    </TouchableOpacity>
  );


  
  ButtonInfo = (value,IsActive,IdPatient) => (
     
    <View style={{flex:1,flexDirection:'row',}}>
      {/* <View style={{flex:2}}> */}
    <TouchableOpacity onPress={() => this.props.navigation.navigate('FormPatientScreen',{
      IdPatient : IdPatient,Type : "Info",DisableForm : true
    }) }>
        <Text style={{fontSize:15,margin:6,color:'#a37ec2',
        fontWeight : IsActive == '1'  ? 'bold' : 'normal'
        }}> Info </Text>
    </TouchableOpacity>
    {/* </View> */}

    {/* <View style={{flex:2}}> */}
    <TouchableOpacity onPress={() => this.props.navigation.navigate('FormPatientScreen',{
      IdPatient : IdPatient,Type : "Update",DisableForm : false
    }) }>
        <Text style={{fontSize:15,margin:6,color:'#a37ec2',
        fontWeight : IsActive == '1'  ? 'bold' : 'normal'
        }}> Update </Text>
    </TouchableOpacity>
    {/* </View> */}

    {/* <View style={{flex:2}}> */}
    <TouchableOpacity onPress={() => this.DeletePatient(IdPatient) }>
        <Text style={{fontSize:15,margin:6,color:'#a37ec2',
        fontWeight : IsActive == '1'  ? 'bold' : 'normal'
        }}> Delete </Text>
    </TouchableOpacity>
    {/* </View> */}
    
    </View>
    
  );

  componentDidMount= async () =>{
    // console.log("tester")
    await this._retrieveData('FirstName');
    await this._retrieveData('Email');
    await this._retrieveData('UserID');
    await this.getPatient();
    if (this.props.route.params.ReloadPage){
      this.getPatient();
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


  render() {
    const state = this.state;
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;

    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 2; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }

    return (
        
      <View style={styles.container}>
          <ImageBackground source={require("../Image/Patient_Background.png")} resizeMode="cover" style={styles.image}>
        <View style={{flex:1}}>
        <HeadingBackgroundMenu nav={navigation}></HeadingBackgroundMenu>
        </View>
      
        <View style={{flex:5,paddingLeft:30,paddingRight:30,marginTop:-90}}>
            <View style={{flexDirection:'column',height:'100%'}}> 
            <View style={{ flex: 1, }} />
      
      
      <View style={{ flex: 2}}>
        <View style={{flexDirection:'row',height:50,marginBottom:30}}>
            <View style={{flex:2}}></View>
            <View style={{flex:1}}></View>
            <View style={{flex:3}}>
            <LinearGradient colors={['#6857d6', '#876ae3', '#aa7ef3']} style={styles.linearGradient}>
              <TouchableOpacity
              onPress={()=>navigate('FormPatientScreen',{
                IdPatient : 0,Type : "Register",DisableForm : false
              })}
              >
  <Text style={styles.buttonTextPasien}>
    TAMBAH PASIEN
  </Text>
  </TouchableOpacity>
</LinearGradient>
              </View>          
        </View>
      <View  style={{ backgroundColor: "#ededef",padding:2 }}>
      
      <Table borderStyle={{backgroundColor:'red'}}>
          <Row data={state.tableHead} style={{height:50,padding:5,backgroundColor:'#ae80f5'}} textStyle={{color:'white',fontSize:15,fontWeight:'bold'}}
          
          />
          <Rows 
          widthArr={state.widthArr}
          data={this.state.tableData} style={{backgroundColor:'white',padding:2,height:50}} textStyle={{fontSize:15,margin:6,color:'#a37ec2'}}/>
        </Table>
        {
  this.state.ShowLoading ?
<ActivityIndicator size="large" color="#662d91"  style={styles.loading}/> : 
<View></View>
}
      </View>
      </View>




      <View style={{ flex: 1,  }} />
            </View>
        </View>
 
        <AlertSuccess showAlertSuccess={this.state.showAlertSuccess} Message={this.state.SuccessMessage}/>
        <AlertError showAlertError={this.state.showAlertError} cancelAlert={this} Title="Error" Message={this.state.ErrorMessage}/>
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -50,
    bottom: 0,
    zIndex : 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  buttonTextPasien: {
    fontSize: 12,
    fontFamily: 'Roboto',
    textAlign: 'center',
    margin: 12,
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontWeight:'bold'
  },
  buttonTextAkun: {
    fontSize: 17,
    fontFamily: 'Roboto',
    textAlign: 'center',
    margin: 15,
    color: '#662d91',
    fontWeight:'bold',
    backgroundColor: 'transparent',
  },


  text: { margin: 6 }
  });

export default PatientScreen;
