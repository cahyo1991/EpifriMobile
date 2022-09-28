import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground,TextInput,TouchableOpacity,Image,AsyncStorage,Modal,TouchableHighlight } from 'react-native';
import { Heading } from '../component/Heading';
import BgLogin from '../Image/LoginBackgroungPatient.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { HeadingMenu } from '../component/HeadingMenu';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
const imagebg = { uri: "https://reactjs.org/logo-og.png" };
class VideoReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date :  new Date(this.props.route.params.date),
      // this.props.route.params.date ,
      IdPatient : this.props.route.params.IdPatient,
      PatientName : this.props.route.params.PatientName,
      ListVideo : [],
      EkstensiFile : [],
      modalVisible : false,
      ActiveImage : ""
    };
  }


  componentDidMount = async () =>{
    let ApiGetSizure = global.Api + "Journey/GetSeizure?PatientID=" + this.state.IdPatient + "&&Date=" + this.props.route.params.date;
    console.log("ApiGetSizure = " + ApiGetSizure);
    await fetch(ApiGetSizure).then(
      Response => Response.json()
    ).then(
      json =>{

        var self = this;
        
        this.setState({
          AvgDuration : json["AvgDuration"],
          SeizureCount : json["SeizureCount"],
          IdSeizure : json["Id"]
        })


      }
    )

    await this.getListVideo(this.state.IdSeizure)
  }


  RemoveVideo = (Id) =>{
    let ApiRemoveVideo = global.Api +"Patient/DeleteVideo?VideoID=" + Id;
    console.log("Api Remove Video " + ApiRemoveVideo);
    fetch(ApiRemoveVideo).then(
      Response => Response.json()
    ).then(
      json =>{
        alert("Video Berhasil DiHapus !");
        
      }
    )
  }

  
  getEkstensiFie = (FileName_) =>{
    return FileName_.split('.').pop();
  }


  getListVideo = (IdSeizure) =>{

    let ApiGetVideoSeizure = global.Api + "Journey/GetVideo?SeizureID=" + IdSeizure;
    console.log("GETVIDEO =" + ApiGetVideoSeizure);
    fetch(ApiGetVideoSeizure).then(
      Response => Response.json()
    ).then(
      json =>{
        console.log("seizure video =" +JSON.stringify(json))
        var arr = [];
        var arrId = [];
        var arrEkstensi = [];
        if (json[0]["Status"] == 'False') {
          
        }else{
        for (let index = 0; index < json.length; index++) {
          // alert(json[index]['Video'])
          // const element = array[index];
          arr.push(json[index]['Video'])
          arrId.push(json[index]['Id'])
          arrEkstensi.push(
            this.getEkstensiFie(json[index]['Video'])
          )
          
        }
        this.setState({
          ListVideo : arr,
          VideoId : arrId,
          EkstensiFile : arrEkstensi
        })
      }
    }
    )
  }

  showModalImage =(Link) =>{
    const imageLink = "http://wml.darya-varia.com:8585/content/uploads/" + Link;
    return (
      <View style={styles.centeredView}>
           <Modal animationType = {"slide"} transparent = {false}
               visible = {this.state.modalVisible}
               onRequestClose = {() => { console.log("Modal has been closed.") } }>
               
               <View style = {{flex: 1,marginTop:30,flexDirection:'column'}}>
                <View style={{flex:1}}>
                  <Text style = {{fontSize:25,color:'white',backgroundColor:'black',marginBottom:20,padding:10,
                textAlign:'center'}}>
                    { this.state.ActiveTypeFile }
                </Text>
                  </View>
                  <View style={{
                    flex:2
                  }}>

{
  this.state.ActiveTypeFile == 'Video'
  ?
<VideoPlayer
video={{
  uri: imageLink
}}
autoplay={true}
defaultMuted={true}
videoHeight={100}
videoWidth = {100}
/>
:
<Image
style={styles.tinyLogo}
source={{
  uri: imageLink,
}}
/>
}
                  </View>


                  <TouchableHighlight onPress = {() => {
                     this.setState({
                       modalVisible : false
                     })
                     }}>
                     
                     <Text style = {styles.text}>Close</Text>
                  </TouchableHighlight>
               </View>
            </Modal>
      </View>
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
        <View style={{flex:2,paddingLeft:40,paddingRight:40,paddingTop:5}}>
        <View style={{backgroundColor:'white',height:210,borderRadius:20,padding:30}}>
        <Text style={{fontSize:17,color:'#6733ac',fontWeight:'bold',marginTop:-10,marginBottom:10}}>Laporan Video/Foto Kejang</Text>
            <Text style={{fontSize:17,color:'#6733ac'}}>Tanggal         : 
            {/* {this.state.date.getDate() } */}
            {" " + this.state.date.getDate() + " " + monthNames[this.state.date.getMonth()] + " " + this.state.date.getFullYear()  }
             </Text>
            <Text style={{fontSize:17,color:'#6733ac'}}>Jumlah Kejang : {this.state.SeizureCount}</Text>

            {/* <Text style={{fontSize:17,marginTop:20,color:'#6733ac'}}>Rata Rata Kejang Per Hari : </Text>
            <Text style={{fontSize:17,color:'#6733ac'}}>{this.state.AvgDuration} Kali
            </Text> */}
        </View>


        </View>

        <View style={{flex:2,paddingLeft:30,paddingRight:30,marginTop:10,}}>

        <View style={{height:150,flexDirection:'row',padding: 20,}}>
          <ScrollView>
            {
              this.state.ListVideo.map((item,key)=>(
                <View style={{flex:1,flexDirection:'row',marginBottom:5}}>
                <View style={{flex: 3,}}>
                <Text style={{fontSize:17,color:'#6733ac',fontWeight:'bold'}}>Video / Foto {key+1} </Text>
                </View>


                <View style={{flex: 3,}}>

                  <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex: 2,}}>
                    <TouchableOpacity
                      onPress = {
                        ()=>{
                          this.setState({
                            ActiveImage : item,
                            modalVisible : true,
                            ActiveTypeFile : this.state.EkstensiFile[key] == 'mp4' ? 'Video' : 'Gambar'
                          })
                        }
                      }
                    >
                <Text style={{fontSize:17,color:'#6733ac',}}>Lihat  </Text>
                </TouchableOpacity>
                    </View>
                    <View style={{flex: 1,}}>
                    
                <Text style={{fontSize:17,color:'#6733ac',}}>|</Text>
                
                    </View>
                    <View style={{flex: 2,marginLeft:-10}}>
                    <TouchableOpacity
                    onPress= {
                      ()=>{
                        this.RemoveVideo(this.state.VideoId[key])
                      }
                    }
                    >
                <Text style={{fontSize:17,color:'#6733ac',}}>Hapus</Text>
                </TouchableOpacity>
                    </View>
                  </View>
             
                </View>
            </View>
            
              ))
            }
      
            
          </ScrollView>
          </View>

<View style={{height:80,flexDirection:'row',marginTop:15}}>
{/* <TouchableOpacity> */}
<View style={{flex:1}}></View>
<View style={{height:55,width:'100%'}}>
{/* <LinearGradient colors={['#6857d6', '#876ae3', '#aa7ef3']} style={styles.linearGradient}>
  <TouchableOpacity onPress={()=> navigate('PatientJourneyScreen')}>
  <Text style={styles.buttonText}>
    PERBAHARUI
  </Text>

  </TouchableOpacity>
</LinearGradient> */}
</View>
<View style={{flex:1}}></View>

{/* </TouchableOpacity> */}
</View>


        </View>

{
  this.state.modalVisible ? 
  this.showModalImage(this.state.ActiveImage)
   : 
   <View></View>
}

        
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
      fontSize: 20,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    },
    tinyLogo: {
      width: '100%',
      height : '100%'
      // height: 50,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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

export default VideoReportScreen;
