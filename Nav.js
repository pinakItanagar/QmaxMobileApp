import React, { useContext , useEffect } from 'react';
import { Text, View, TouchableOpacity , Alert, BackHandler } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splashscreen from "./Splashscreen" ;
import Login from "./Login" ;
import Home from "./screens/Home" ;
import Register from "./screens/Register";
import SearchProduct from "./screens/SearchProduct";
import Procurement from "./screens/Procurement";
import Orderhistory from "./screens/Orderhistory";
import Qrcodescanner from "./screens/Qrcodescanner";
import Profile from "./screens/Profile";
import Forgotpassword from "./screens/Forgotpassword";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';
import {  AuthContext } from './AuthContext';
import { ConfigData } from './myconfig.json';
import DeviceInfo from 'react-native-device-info';
import { stringMd5 } from 'react-native-quick-md5';


const Nav = () => {
    
    const Stack = createNativeStackNavigator();

    const { isLogin , appjwt, userAndroidID, setUserAndroidID, setAppJWT, setLogin } = useContext(AuthContext);
    

    const  getAndroidID = async () => {  
      let androidID = await DeviceInfo.getAndroidId();
      const md5AndroidID = stringMd5(androidID);
      return md5AndroidID;
    }
    
  

    const  removeAccessToken = async () => {  
         setUserAndroidID(null);
         getAndroidID().then( (androidID) => {
          setUserAndroidID(androidID);
         }); 
         
         
         if(userAndroidID != null) {

          let apiUrl = "";
          if(ConfigData.envType === 0) {
            apiUrl = ConfigData.devBaseURL + 'deleteAccessToken.php';
          } else {
            apiUrl = ConfigData.prodBaseURL + 'deleteAccessToken.php';
          }

          try {
            
              const response = await fetch(apiUrl,  {
                method: 'POST',
                headers: { 
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                } ,
                body: JSON.stringify({
                  userID: userAndroidID
                }) 
        
              });
        
              const json = await response.json();
              setAppJWT('');
              setLogin(0);
          
          } catch (error) {
            
              console.error(error);
              setAppJWT('');
              setLogin(0);
              
          }
        
         }
    }


  

    const showAlert = () =>
    Alert.alert(
      'Qmax App',
      'Are you sure to exit',
      [
        {
          text: 'Yes',
          onPress: () => {  

            removeAccessToken();
            setAppJWT('');
            setLogin(0);
            
            BackHandler.exitApp(); 
          },
          style: 'cancel',
        },
        {
          text: 'No',
          onDismiss: () => null,
          style: 'cancel',
        }
      ],
      {
        cancelable: true,
        onDismiss: () => null,
      },
  );


   const signOut = () => {
    showAlert();
   };   

    

    return(
       
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splashscreen'>
            { isLogin == 1 ? (   <>
                <Stack.Screen name="Home"  
                        component={Home} 
                        options={{ 
                            title: 'QMAX Portfolio',
                            headerStyle: { backgroundColor: '#005F97' },
                            headerTintColor: '#fff',
                            headerRight: () => (
                                <View>
                                     <TouchableOpacity onPress = {() => signOut()  }>
                                        <FontAwesomeIcon icon={ faSignOut } size={25} color={ '#fff' } />
                                     </TouchableOpacity> 
                                    
                                </View>
                            )
                        }} />
               

                    <Stack.Screen name="SearchProduct"  
                        component={SearchProduct} 
                        options={{ 
                            title: 'QMAX Portfolio Search',
                            headerStyle: { backgroundColor: '#005F97' },
                            headerTintColor: '#fff',
                            headerRight: () => (
                                <View>
                                     <TouchableOpacity onPress = {() => signOut()  }>
                                        <FontAwesomeIcon icon={ faSignOut } size={25} color={ '#fff' } />
                                     </TouchableOpacity> 
                                    
                                </View>
                            )
                        }} />  

                    <Stack.Screen name="Procurement"  
                        component={Procurement} 
                        options={{ 
                            title: 'QMAX Product Procurement',
                            headerStyle: { backgroundColor: '#005F97' },
                            headerTintColor: '#fff',
                            headerRight: () => (
                                <View>
                                     <TouchableOpacity onPress = {() => signOut()  }>
                                        <FontAwesomeIcon icon={ faSignOut } size={25} color={ '#fff' } />
                                     </TouchableOpacity> 
                                    
                                </View>
                            )
                        }} />  


                 <Stack.Screen name="Orderhistory"  
                        component={Orderhistory} 
                        options={{ 
                            title: 'QMAX Order History',
                            headerStyle: { backgroundColor: '#005F97' },
                            headerTintColor: '#fff',
                            headerRight: () => (
                                <View>
                                     <TouchableOpacity onPress = {() => signOut()  }>
                                        <FontAwesomeIcon icon={ faSignOut } size={25} color={ '#fff' } />
                                     </TouchableOpacity> 
                                    
                                </View>
                            )
                        }} />  


                     <Stack.Screen name="Qrcodescanner"  
                        component={Qrcodescanner} 
                        options={{ 
                            title: 'QMAX Product Scanner',
                            headerStyle: { backgroundColor: '#005F97' },
                            headerTintColor: '#fff',
                            headerRight: () => (
                                <View>
                                     <TouchableOpacity onPress = {() => signOut()  }>
                                        <FontAwesomeIcon icon={ faSignOut } size={25} color={ '#fff' } />
                                     </TouchableOpacity> 
                                    
                                </View>
                            )
                        }} />  


                       <Stack.Screen name="Profile"  
                        component={Profile} 
                        options={{ 
                            title: 'QMAX Dealer Profile',
                            headerStyle: { backgroundColor: '#005F97' },
                            headerTintColor: '#fff',
                            headerRight: () => (
                                <View>
                                     <TouchableOpacity onPress = {() => signOut()  }>
                                        <FontAwesomeIcon icon={ faSignOut } size={25} color={ '#fff' } />
                                     </TouchableOpacity> 
                                    
                                </View>
                            )
                        }} />       

                 

           
               </>  ) :  ( 
                <>
                    <Stack.Screen name="Splashscreen"  component={Splashscreen} options={{headerShown:false}} /> 
                    <Stack.Screen name="Login"  component={Login} options={{headerShown:false}} /> 
                    <Stack.Screen name="Register"  
                            component={Register} 
                            options={{ 
                                title: 'QMAX Dealer Registration',
                                headerStyle: { backgroundColor: '#005F97' },
                                headerTintColor: '#fff'
                    }} /> 
                    <Stack.Screen name="Forgotpassword"  
                            component={Forgotpassword} 
                            options={{ 
                                title: 'QMAX Forgot Password',
                                headerStyle: { backgroundColor: '#005F97' },
                                headerTintColor: '#fff'
                    }} /> 
                </>
             ) } 
            </Stack.Navigator>
        </NavigationContainer>
    );
    
   

   

  
  }

 
  export default Nav;