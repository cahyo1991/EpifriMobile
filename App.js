import React, { useState,useEffect  } from 'react';
import { View, Text, ScrollView,AsyncStorage } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator,createAppContainer } from '@react-navigation/stack';
import { NavigationContainer,SafeAreaView  } from '@react-navigation/native';
import Rootstack from './Rootstack.js';

import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screen/HomeScreen.js';
import RegisterScreen from './screen/RegisterScreen.js';
import QrScreen from './screen/QrScreen.js';
import LoginScreen from './screen/LoginScreen.js';
import ForgotPasswordScreen from './screen/ForgotPasswordScreen.js';
import PatientScreen from './screen/PatientScreen.js';
import FormPatientScreen from './screen/FormPatientScreen.js';
import DailyNoteScreen from './screen/DailyNoteScreen.js';
import PatientJourneyScreen from './screen/PatientJourneyScreen.js';
import DailyReportScreen from './screen/DailyReportScreen.js';
import OtpScreen from './screen/OtpScreen.js';
import {AuthContext} from './context.js';
import AuthLogin from './component/AuthLogin.js';
import AuthLogout from './component/AuthLogout.js';
import VideoReportScreen from './screen/VideoReportScreen.js';
import MedicineReportScreen from './screen/MedicineReportScreen.js';


// import { createStackNavigator } from 'react-navigation-stack';
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const LoginStack = createStackNavigator();

global.Api = process.env.baseUrl;


const DrawerStackScreen = ({navigation}) =>(
  <Drawer.Navigator initialRouteName="Home"
  drawerPosition="right"
  drawerStyle={{backgroundColor:'#f2f2f2'}}
  >
          <Drawer.Screen name="Beranda" component={HomeScreen} />
          <Drawer.Screen name="Catatan Harian" component={DailyNoteScreen} />
          <Drawer.Screen name="Epilepsy Free Journey" component={PatientJourneyScreen} />
          <Drawer.Screen name="Pasien" component={PatientScreen} />
          <Drawer.Screen name="Keluar" component={AuthLogout} />
          
        </Drawer.Navigator>
)


const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator
   screenOptions={{
    headerShown:false
  }}
  // initialRouteName={AuthLogin}
>
<HomeStack.Screen name="HomeScreen" component={DrawerStackScreen}  />
<HomeStack.Screen name="FormPatientScreen" component={FormPatientScreen}  />
<HomeStack.Screen name="PatientScreen" component={PatientScreen}  />
<HomeStack.Screen name="QrScreen" component={QrScreen}  />
<HomeStack.Screen name="DailyNoteScreen" component={DailyNoteScreen}  />
<HomeStack.Screen name="PatientJourneyScreen" component={PatientJourneyScreen}  />
<HomeStack.Screen name="DailyReportScreen" component={DailyReportScreen}  />
<HomeStack.Screen name="VideoReportScreen" component={VideoReportScreen}  />
<HomeStack.Screen name="MedicineReportScreen" component={MedicineReportScreen}  />
<HomeStack.Screen name="AuthLogout" component={AuthLogout}  />
</HomeStack.Navigator>
);


export default function App() {
useEffect(() =>{
  SplashScreen.hide();
})



const [userToken,setUserToken] = React.useState(null);

const authContext  = React.useMemo(()=>{
return {
  signIn : ()=>{
    
    setUserToken('asdf');
  },
  signOut : ()=>{
    setUserToken(null)
  },
}
},[])

    return  (
      <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        
{/* <Rootstack/> */}

{
  userToken!=null ? 
  <Drawer.Navigator initialRouteName="Home"
  drawerPosition="right"
  drawerStyle={{backgroundColor:'#f2f2f2'}}
  >
          <Drawer.Screen name="Epifri App" component={HomeStackScreen} />
          <Drawer.Screen name="Beranda" component={HomeScreen} />
          <Drawer.Screen name="Catatan Harian" component={DailyNoteScreen} />
          <Drawer.Screen name="Epilepsy Free Journey" component={PatientJourneyScreen} />
          <Drawer.Screen name="Pasien" component={PatientScreen} />
          <Drawer.Screen name="Keluar" component={AuthLogout} />
          
        </Drawer.Navigator>
        : 
        <Rootstack/>
}




     




    </NavigationContainer>
     </AuthContext.Provider>
    )
  } 




// const AppNavigator = createStackNavigator({
//   LoginScreen : {
//     screen : LoginScreen,
//     navigationOptions: {
    
//       header: null //this will hide the header
//     },
//   },
//   RegisterScreen : {
//     screen : RegisterScreen,
//     navigationOptions : {
//       header : null 
//     }
//   }
// })

// const Appx = createAppContainer(AppNavigator);



