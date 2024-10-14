import React, { useEffect , useState, useContext} from 'react';
import { LoginPageStyle } from "./assets/css/LoginPageStyle";
import Video from "react-native-video";
import {  AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConfigData } from './myconfig.json';
import DeviceInfo from 'react-native-device-info';
import { stringMd5 } from 'react-native-quick-md5';
import Spacer  from "./assets/css/Spacer";

import {
    SafeAreaView,
    View,
    ScrollView,
    Image,
    ToastAndroid
  } from 'react-native';

  
  const Splashscreen = ({navigation}) => {
    
    const [changeScreen, setChangeScreen] = useState(false);
    const { isLogin , appjwt, setAppJWT, setLogin, setUserAndroidID } = useContext(AuthContext);
    


    const  getUserAccessToken = async (androidID) => {  

        let apiUrl = "";
        if(ConfigData.envType === 0) {
          apiUrl = ConfigData.devBaseURL + 'getAccessToken.php';
        } else {
          apiUrl = ConfigData.prodBaseURL + 'getAccessToken.php';
        }


        try {
          
            const response = await fetch(apiUrl,  {
              method: 'POST',
              headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json'
              } ,
              body: JSON.stringify({
                userID: androidID,
                deviceAppVersion : ConfigData.appVersion
              }) 
      
            });
      
            const json = await response.json();
           
            if(json.apiResponse === 0) {
              setAppJWT('');
              setLogin(0);
              navigation.navigate('Login');
            } else {
              setAppJWT(json.jwt);
              setLogin(1);
              navigation.navigate('Home');
            }
         
          } catch (error) {
           
            console.error(error);
            setAppJWT('');
            setLogin(0);
            
          }
    }; 
   
    const  getAndroidID = async () => {  
      let androidID = await DeviceInfo.getAndroidId();
      const md5AndroidID = stringMd5(androidID);
     return md5AndroidID;
    }
  
    const gotoLogin = () => {
      getAndroidID().then((androidID) => {
        setUserAndroidID(androidID);
        getUserAccessToken(androidID);
      });
        
    }

    useEffect(() => {

      const timeoutId = setTimeout(() => {
        gotoLogin();
      }, 3000);

      return () => clearTimeout(timeoutId);
   
    }, []);  

 

   
    return(

      <SafeAreaView style={LoginPageStyle.appContainer}>
        
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={LoginPageStyle.appContainer}>
         
          <View style={LoginPageStyle.appContainer}>
              <Spacer size={40} /> 
               <Image source={require('./assets/images/qmax.png')} style={LoginPageStyle.splashimage} /> 
             
                     
             
          </View>
        </ScrollView>
      </SafeAreaView>

    )
  }

 
  export default Splashscreen;