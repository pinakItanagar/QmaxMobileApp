import React, { useEffect, useState, useContext } from 'react';
import { HomePageStyle } from "../assets/css/HomePageStyle"
import Spacer  from "../assets/css/Spacer";
import { Card } from 'react-native-elements'
import Imageloader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Footer from '../screens/Footer'
import { RegistrationPageStyle } from "../assets/css/RegistrationPageStyle"
import { AuthContext } from '../AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { ConfigData } from '../myconfig.json';


import {
    SafeAreaView,
    ScrollView,
    FlatList,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    ToastAndroid
  } from 'react-native';

  const Forgotpassword = ({navigation}) => {

    const { setAppJWT, setLogin, isLogin } = useContext(AuthContext); 
    const [isSearching, setSearching] = React.useState(false);
    const [apiResponse, setAPIResponse] = React.useState(-1); 
    const [userMobile, onChangeSetMobile] = React.useState('');
    const [userSetPassword, onChangeSetPassword] = React.useState('');
    const [userCnfPassword, onChangeCnfPassword] = React.useState('');
   

    let apiUrl = "";
   
    if(ConfigData.envType === 0) {
       apiUrl = ConfigData.devBaseURL + 'forgotPassword.php';
    } else {
       apiUrl = ConfigData.prodBaseURL + 'forgotPassword.php';
    }
    
  
    
   
   
    const logOut = () => {
        setAppJWT('');
        setLogin(0);
    };  


    const checkTextInput = () => {
        if (!userMobile.trim()) {
            ToastAndroid.show('Dealer mobile no is required ', ToastAndroid.LONG);
            return false;  
        }  else   if (isNaN(userMobile)) {
            ToastAndroid.show('Mobile no should be (10) digit number ', ToastAndroid.LONG);
            return false;  
        }  else   if (userMobile.length < 10) {
            ToastAndroid.show('Mobile no should be (10) digit number ', ToastAndroid.LONG);
            return false;    
       } else if (!userMobile.trim()) {
            ToastAndroid.show('Dealer password is required for updation ', ToastAndroid.LONG);
            return false;     
       }  else   if (userSetPassword.length < 6) {
            ToastAndroid.show('Password should be at least six characters long ', ToastAndroid.LONG);
            return false;     
       } else  if(userSetPassword !== userCnfPassword) {
            ToastAndroid.show('Set password & Confirm password is not matching ', ToastAndroid.LONG);
            return false; 
       } else {
            return true;
       }
       
    };

  
 

    const resetUserPassword = async () => {

        if(checkTextInput()) {

            setSearching(true);
        
            try {
                const response = await fetch(apiUrl,  {
                    method: 'POST',
                    headers: { 
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        userMobile: userMobile,
                        userSetPassword : userSetPassword,
                        userCnfPassword : userCnfPassword
                    }) 
                
                });

                const json = await response.json();
                console.log("User Details " + json.dealer_details);
                setSearching(false);
                
                if(json.apiResponse == '-1') {
                    onChangeSetPassword('');
                    onChangeCnfPassword('');
                    onChangeSetMobile('');
                    ToastAndroid.show('Mobile no is not register with us !', ToastAndroid.LONG);
                } else {
                    setAppJWT(json.jwt);
                    setLogin(1);
                    onChangeSetPassword('');
                    onChangeCnfPassword('');
                    onChangeSetMobile('');
                    ToastAndroid.show('Password updated successfully ! ', ToastAndroid.LONG);
                    navigation.navigate('Home');
                   
                }
                
        
            } catch (error) {
                setSearching(false);
                console.error(error);
            }
        }
    };
   

     
   

     if(apiResponse == '-1') {

        if( isLogin == 1 ) {
            return (
                <SafeAreaView style={RegistrationPageStyle.appContainer}>
                <Image source={require('../assets/images/qmax_banner.png')} style={HomePageStyle.imageHeader} /> 
                <Spacer size={30} />
                <ScrollView     style={RegistrationPageStyle.scrollViewContainer}> 
                        <Card>
                                
                                    <View  >

                                            
                                            
                                            <Spinner
                                                visible={isSearching}
                                                textContent={'Verifying registered mobile'}
                                                textStyle={RegistrationPageStyle.spinnerTextStyle}
                                            />  

                                    
                                            <TextInput
                                                style={RegistrationPageStyle.inputTxt}
                                                onChangeText={(text) => onChangeSetMobile(text)}
                                                placeholder="Registered Dealer Mobile no (Voice)"
                                                autoCorrect={false}
                                                value={userMobile}
                                                placeholderTextColor="#000" 
                                                keyboardType="numeric"
                                                maxLength={10}
                                            /> 

                                            <TextInput
                                                style={RegistrationPageStyle.inputTxt}
                                                onChangeText={(text) => onChangeSetPassword(text)}
                                                placeholder="Set New Password"
                                                secureTextEntry
                                                autoCorrect={false}
                                                value={userSetPassword}
                                                placeholderTextColor="#000" 
                                            />


                                            <TextInput
                                                style={RegistrationPageStyle.inputTxt}
                                                onChangeText={(text) =>onChangeCnfPassword(text)}
                                                placeholder="Confirm New Password"
                                                autoCorrect={false}
                                                value={userCnfPassword}
                                                placeholderTextColor="#000" 
                                            />  

                                        

                                        
                                        
                                            <TouchableOpacity
                                                    style = {HomePageStyle.submitButton}
                                                    onPress = {() => resetUserPassword() }
                                                >
                                                <Text style = {HomePageStyle.submitButtonText}> Reset Password </Text>
                                            </TouchableOpacity>
                                        
                                    </View>  
                                
                        </Card>
                        <Spacer size={60} />
                    </ScrollView>  
                    
                    
                
            
                    <Footer navigation = { navigation } ></Footer>; 
                
                </SafeAreaView>
        
            );
        } else {

            return (
                <SafeAreaView style={RegistrationPageStyle.appContainer}>
                <Image source={require('../assets/images/qmax_banner.png')} style={HomePageStyle.imageHeader} /> 
                <Spacer size={30} />
                <ScrollView     style={RegistrationPageStyle.scrollViewContainer}> 
                        <Card>
                                
                                    <View  >

                                            
                                            
                                            <Spinner
                                                visible={isSearching}
                                                textContent={'Verifying registered mobile'}
                                                textStyle={RegistrationPageStyle.spinnerTextStyle}
                                            />  

                                    
                                            <TextInput
                                                style={RegistrationPageStyle.inputTxt}
                                                onChangeText={(text) => onChangeSetMobile(text)}
                                                placeholder="Registered Dealer Mobile no (Voice)"
                                                autoCorrect={false}
                                                value={userMobile}
                                                placeholderTextColor="#000" 
                                                keyboardType="numeric"
                                                maxLength={10}
                                            /> 

                                            <TextInput
                                                style={RegistrationPageStyle.inputTxt}
                                                onChangeText={(text) => onChangeSetPassword(text)}
                                                placeholder="Set New Password"
                                                secureTextEntry
                                                autoCorrect={false}
                                                value={userSetPassword}
                                                placeholderTextColor="#000" 
                                            />


                                            <TextInput
                                                style={RegistrationPageStyle.inputTxt}
                                                onChangeText={(text) =>onChangeCnfPassword(text)}
                                                placeholder="Confirm New Password"
                                                autoCorrect={false}
                                                value={userCnfPassword}
                                                placeholderTextColor="#000" 
                                            />  

                                        

                                        
                                        
                                            <TouchableOpacity
                                                    style = {HomePageStyle.submitButton}
                                                    onPress = {() => resetUserPassword() }
                                                >
                                                <Text style = {HomePageStyle.submitButtonText}> Reset Password </Text>
                                            </TouchableOpacity>
                                        
                                    </View>  
                                
                        </Card>
                        <Spacer size={60} />
                    </ScrollView>  
                    
                    
                
                </SafeAreaView>
        
            );

        }    

    } 


  }

  export default Forgotpassword;