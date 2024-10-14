import React, { useEffect , useContext} from 'react';
import { LoginPageStyle } from "./assets/css/LoginPageStyle";
import Spacer  from "./assets/css/Spacer";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from './AuthContext';
import { ConfigData } from './myconfig.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { stringMd5 } from 'react-native-quick-md5';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Button,
    TextInput,
    useColorScheme,
    View,
    Image,
    Alert,
    TouchableOpacity,
    ToastAndroid
  } from 'react-native';

  const Stack = createNativeStackNavigator();
  const Login = ({navigation}) => {
    
    const { appjwt,  setAppJWT, setLogin, userAndroidID, setUserAndroidID } = useContext(AuthContext);
    //const isDarkMode  = useColorScheme() === 'dark';
  
 
    const [userID, onChangeUserID] = React.useState('');
    const [userPassword, onChangePassword] = React.useState('');
    const [apiResponse, setAPIResponse] = React.useState(-1);
    const [isLoading, setLoading] = React.useState(false);
    const [deviceVersion, setDeviceVersionNo] = React.useState(ConfigData.appVersion);
    const [serverAppVersion, setServerAppVersionNo] = React.useState("");
    const [userTokenState, setUserTokenState] = React.useState('');

    const showToast = ( error_code ) => {
      if(error_code === 0) {
        ToastAndroid.show('Invalid User ID/Password !', ToastAndroid.LONG);
      } else if (error_code === 0) {
        ToastAndroid.show('User registration pending !', ToastAndroid.LONG);
      }
    };

    const checkTextInput = () => {
      if (!userID.trim()) {
        ToastAndroid.show('Dealer name is required ', ToastAndroid.LONG);
        return false;
      }  else   if (!userPassword.trim()) {
        ToastAndroid.show('Dealer contact person name is required ', ToastAndroid.LONG);
        return false;
      } else {
        return true;
      }
    };


   


   const  getAndroidID = async () => {  
     let androidID = await DeviceInfo.getAndroidId();
     const md5AndroidID = stringMd5(androidID);
     return md5AndroidID;
   }

  

   const  setUserAccessToken = async (jwt) => {  

        let apiUrl = "";
        if(ConfigData.envType === 0) {
          apiUrl = ConfigData.devBaseURL + 'setAccessToken.php';
        } else {
          apiUrl = ConfigData.prodBaseURL + 'setAccessToken.php';
        }
  
        try {
          setLoading(true);
          const response = await fetch(apiUrl,  {
            method: 'POST',
            headers: { 
              Accept: 'application/json',
              'Content-Type': 'application/json'
            } ,
            body: JSON.stringify({
              jwt: jwt,
              userAndroidID: userAndroidID
            }) 
    
          });
    
          const json = await response.json();
          console.log(json);
          setLoading(false);
          if(json.apiResponse === 0) {
            setAppJWT('');
            setLogin(0);
          } else {
            setAppJWT(jwt);
            setLogin(1);
          }
       
        } catch (error) {
          setLoading(false);
          console.error(error);
          setAppJWT('');
          setLogin(0);
          
        }

  }; 


 
  

    const getAppVersion = async () => {
      setLoading(true);
      let apiUrl = "";
      if(ConfigData.envType === 0) {
          apiUrl = ConfigData.devBaseURL + 'getAppVersion.php';
      } else {
        apiUrl = ConfigData.prodBaseURL + 'getAppVersion.php';
      }

      try {

        const response = await fetch(apiUrl,  {
          method: 'POST',
          headers: { 
            Accept: 'application/json',
            'Content-Type': 'application/json'
          } ,
          body: JSON.stringify({
            deviceVersion: deviceVersion
          }) 

        });

        const json = await response.json();
        setLoading(false);
        console.log(json.serverAppVersion);
        setServerAppVersionNo(json.serverAppVersion);
   
      } catch (error) {
        setLoading(false);
        console.error(error);
        
      }
    };
    
    const authenticate = async () => {
      
      if(serverAppVersion != deviceVersion) {
        ToastAndroid.show('Your App Version is Old ', ToastAndroid.LONG);
      } else {
        setUserAndroidID(null);
        getAndroidID().then( (androidID) => {
          console.log("Android ID " + androidID);
          setUserAndroidID(androidID);
        });
        
        setAPIResponse(-1);
        let apiUrl = "";
        if(ConfigData.envType === 0) {
          apiUrl = ConfigData.devBaseURL + 'authenticateDealer.php';
        } else {
          apiUrl = ConfigData.prodBaseURL + 'authenticateDealer.php';
        }

        if(checkTextInput()) {

          setLoading(true);

          try {
            const response = await fetch(apiUrl,  {
                method: 'POST',
                headers: { 
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                } ,
                body: JSON.stringify({
                  userID: userID,
                  userPassword: userPassword
                }) 
              });
            const json = await response.json();
            console.log(json);
            setAPIResponse(json.apiResponse);
            setAppJWT(json.jwt);
            setLoading(false);
            onChangeUserID({userID: ""});
            onChangePassword({userPassword: ""}); 
            
        
            if (json.apiResponse === 0) {
              onChangeUserID({userID: ""});
              onChangePassword({userPassword: ""});
              showToast(0);
            } else if (json.apiResponse === 2) {  
              onChangeUserID({userID: ""});
              onChangePassword({userPassword: ""});
              showToast(1);
            } else if (json.apiResponse === 1) {  
           
              setUserAccessToken(json.jwt);
              setAppJWT(json.jwt);
              setLogin(1);
              navigation.navigate('Home'); 
            }

          } catch (error) {
            setLoading(false);
            console.error(error);            
          } finally {
            setLoading(false);
            
          }

        

        }

      }
               
    }

    useEffect(() => {
      getAppVersion();
    }, []);


    const gotoRegister = () => {
      if(serverAppVersion != deviceVersion) {
        ToastAndroid.show('Your App Version is old ', ToastAndroid.LONG);
      } else {
        navigation.navigate('Register');
      }
      
    }


    const forgotPassword = () => {
      navigation.navigate('Forgotpassword'); 
    }

    
    /*
    const showVideo = () => {
       return (
        <View>
          <Video
            source={require("./assets/images/qmax_video.mp4")}
            style={LoginPageStyle.backgroundVideo}
            muted={true}
            repeat={true}
            resizeMode={"cover"}
            rate={1.0}
            ignoreSilentSwitch={"obey"}
          />
        </View>
       );
    }
    */
   
    


  

 

   
    return(
        <SafeAreaView style={LoginPageStyle.appContainer}>
        
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={LoginPageStyle.appContainer}>
         
          <View style={LoginPageStyle.appContainer}>
               <Image source={require('./assets/images/qmax.png')} style={LoginPageStyle.image} /> 
               {/*<Text style = {LoginPageStyle.orgTitle}>Rajasthan Lime Udyog</Text>*/}

               <Text style = {LoginPageStyle.versionNoText}>Version v1.0.7</Text>

               <Spacer size={20} />
                <TextInput
                    style={LoginPageStyle.inputTxt}
                    onChangeText={(text) => onChangeUserID(text)}
                    placeholder="Mobile No."
                    keyboardType="numeric"
                    value={userID}
                    maxLength={10}
                    placeholderTextColor="#000" 
                />


                <TextInput
                    style={LoginPageStyle.inputTxt}
                    onChangeText={(text) => onChangePassword(text)}
                    placeholder="Password"
                    secureTextEntry
                    autoCorrect={false}
                    value={userPassword}
                    placeholderTextColor="#000" 
                />

              <Spacer size={10} />  

              <TouchableOpacity onPress={() => forgotPassword()}>
                <Text style={LoginPageStyle.forgotPswdLink}>Forgot Password</Text>
              </TouchableOpacity>
               
              <Spacer size={20} />  

                <TouchableOpacity
                    style = {LoginPageStyle.submitButton}
                    onPress = { () => authenticate()  }>
                    <Text style = {LoginPageStyle.submitButtonText}> LOGIN </Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style = {LoginPageStyle.registerButton}
                    onPress = {() => gotoRegister()  }>
                    <Text style = {LoginPageStyle.submitButtonText}> Dealer Registration </Text>
                </TouchableOpacity>


                <Spinner
                  visible={isLoading}
                  textContent={'Verifying user...'}
                  textStyle={LoginPageStyle.spinnerTextStyle}
                />


     
           
             
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

 
  export default Login;