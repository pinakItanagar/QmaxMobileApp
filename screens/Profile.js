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

  const Profile = ({navigation}) => {

    const { appjwt , setAppJWT, setLogin } = useContext(AuthContext); 
    const [isSearching, setSearching] = React.useState(false);
    const [user, setUser] = React.useState([]);
    const [apiResponse, setAPIResponse] = React.useState(-1); 
    const [userSetPassword, onChangeSetPassword] = React.useState('');
    const [userCnfPassword, onChangeCnfPassword] = React.useState('');
   

    let apiUrl_user_details = "";
    let apiUrl_user_details_update = "";
    if(ConfigData.envType === 0) {
       apiUrl_user_details = ConfigData.devBaseURL + 'getUserDetails.php';
       apiUrl_user_details_update = ConfigData.devBaseURL + 'updateUserDetails.php';
    } else {
       apiUrl_user_details = ConfigData.prodBaseURL + 'getUserDetails.php';
       apiUrl_user_details_update = ConfigData.prodBaseURL + 'updateUserDetails.php';
    }
  
    const getUserDetails = async () => { 
        setSearching(true);
        console.log("Dealer Detail API Triggred");
       
        try {
            const response = await fetch(apiUrl_user_details,  {
                method: 'POST',
                headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    jwt: appjwt
                }) 
              
            });

            const json = await response.json();
            console.log("User Details " + json.dealer_details);
            setSearching(false);
            
            if(json.jwt == "") {
                logOut();
            } else {
               
                setUser(json.dealer_details); 
                setAPIResponse(json.apiResponse);
               
            }
            
       
        } catch (error) {
            setSearching(false);
            console.error(error);
        }
       
    }
   
    
    useEffect(() => {
        getUserDetails();
    }, []);
   
    const logOut = () => {
        setAppJWT('');
        setLogin(0);
    };  


    const checkTextInput = () => {
        if (!userSetPassword.trim()) {
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

 
 
    const changePassword = async () => {

        if(checkTextInput()) {

            setSearching(true);
        
            try {
                const response = await fetch(apiUrl_user_details_update,  {
                    method: 'POST',
                    headers: { 
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        jwt: appjwt,
                        userSetPassword : userSetPassword,
                        userCnfPassword : userCnfPassword
                    }) 
                
                });

                const json = await response.json();
                console.log("User Details " + json.dealer_details);
                setSearching(false);
                
                if(json.jwt == "") {
                    logOut();
                } else {
                    onChangeSetPassword('');
                    onChangeCnfPassword('');
                    setAPIResponse(json.apiResponse);
                    ToastAndroid.show('Password updated successfully ! ', ToastAndroid.LONG);
                }
                
        
            } catch (error) {
                setSearching(false);
                console.error(error);
            }
        }
    };

   

     if(apiResponse == '1') {
        return (
            <SafeAreaView style={RegistrationPageStyle.appContainer}>
               <Image source={require('../assets/images/qmax_banner.png')} style={HomePageStyle.imageHeader} /> 
               <Spacer size={30} />
               <ScrollView     style={RegistrationPageStyle.scrollViewContainer}> 
                    <Card>
                            
                                <View  >

                                        <Spinner
                                            visible={isSearching}
                                            textContent={'Searching the user'}
                                            textStyle={RegistrationPageStyle.spinnerTextStyle}
                                        />   
                                        
                                        <Text style = {HomePageStyle.sectionDescription}>Dealer Firm Name</Text>
                                        <TextInput
                                            style={RegistrationPageStyle.inputTxtDissabled}
                                            editable={false}
                                            selectTextOnFocus={false}
                                            value={user.firmName}
                                       />
                                        
                                        <Text style = {HomePageStyle.sectionDescription}>Dealer Contact Name</Text>
                                        <TextInput
                                            style={RegistrationPageStyle.inputTxtDissabled}
                                            editable={false}
                                            selectTextOnFocus={false}
                                            value={user.contactName}
                                        />

                                        <Text style = {HomePageStyle.sectionDescription}>Dealer City</Text>
                                        <TextInput
                                            style={RegistrationPageStyle.inputTxtDissabled}
                                            editable={false}
                                            selectTextOnFocus={false}
                                            value={user.cityName}
                                        />  

                                        <Text style = {HomePageStyle.sectionDescription}>Dealer Mobile</Text>
                                        <TextInput
                                            style={RegistrationPageStyle.inputTxtDissabled}
                                            editable={false}
                                            selectTextOnFocus={false}
                                            value={user.dealerMobile}
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
                                            onPress = {() => changePassword() }
                                            >
                                            <Text style = {HomePageStyle.submitButtonText}> Update Password </Text>
                                        </TouchableOpacity>
                                      
                                </View>  
                            
                    </Card>
                    <Spacer size={60} />
                </ScrollView>  
                
                
              
    
               <Footer navigation = { navigation } ></Footer>
            </SafeAreaView>
    
            );

    } 


  }

  export default Profile;