import React, { Component } from 'react';
import { View, Text, StyleSheet,ImageBackground,TextInput,TouchableOpacity,Image } from 'react-native';
import { Heading } from '../component/Heading';
import BgLogin from '../Image/LoginBackgroungPatient.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import QR from '../Image/QR.png';
import { HeadingMenu } from '../component/HeadingMenu';
const imagebg = { uri: "https://reactjs.org/logo-og.png" };

class QrScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IdPatient : this.props.route.params.IdPatient
    };
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
    
    <View style={{height:60,marginTop:30}}>
    <Text style={{fontSize:35,textAlign:'center',color:'white',fontWeight:'bold'}}>Scan QR Code Ini</Text>
    </View>
    
    <View style={{height:400,padding:30,}}>
    
    <View style={{backgroundColor:'white',padding:50,borderRadius:20}}>
    <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+this.state.IdPatient,
        }}
      />
    {/* <Image  source={{
      uri : 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example'
    }}/> */}
    </View>
    </View>
    
    
    <View style={{flex:2,}}>
    
    
    
    <View style={{height:60,flexDirection:'row',}}>
    {/* <TouchableOpacity> */}
    <View style={{flex:1}}></View>
    <View style={{flex:3}}>
    <LinearGradient colors={['#ffffff', '#ffffff', '#ffffff']} style={styles.linearGradient}>
    
    <Text style={styles.buttonTextAkun}>
    # {this.state.IdPatient}
    </Text>

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
  marginTop:12,
  color: '#662d91',
  fontWeight:'bold',
  backgroundColor: 'transparent',
},
tinyLogo: {
  width: '100%',
  height: '100%',
},
});

export default QrScreen;
