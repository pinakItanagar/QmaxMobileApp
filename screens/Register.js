import React, { useEffect, useState } from 'react';
import { RegistrationPageStyle } from "../assets/css/RegistrationPageStyle"
import Spacer  from "../assets/css/Spacer";
import { Card, ListItem,  Icon } from 'react-native-elements'
import Imageloader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import { SelectList } from 'react-native-dropdown-select-list'
import Spinner from 'react-native-loading-spinner-overlay';
import RegistrationFooter from '../screens/RegistrationFooter';
import { ConfigData } from '../myconfig.json';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
    Image,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
    Alert,
    Overlay,
    ToastAndroid 
  } from 'react-native';

 

  const Register = ({navigation}) => {

    
    const [firmName, onChangeFirmName] = React.useState('');
    const [contactName, onChangeContactName] = React.useState('');
    const [cityName, onChangeCity] = React.useState('');
    const [gstNoStatus, onChangeGSTstatus] = React.useState('');
    const [gstNo, onChangeGST] = React.useState('');
    const [dealerLocation, onChangeDealerLocation] = React.useState('');
    const [emailAddress, onChangeEmail] = React.useState('');
    const [dealerMobile, onChangeMobile] = React.useState('');
    const [dealerWhatsApp, onChangeWhatsApp] = React.useState('');
    const [userSetPassword, onChangeSetPassword] = React.useState('');
    const [userCnfPassword, onChangeCnfPassword] = React.useState('');
    const [apiResponse, setAPIResponse] = React.useState(-1);
    const [dealerContactPerson, setDealerContactPerson] = React.useState('');
    const [isDisabledGSTNO, setDisabledGST] = React.useState(true);
    const [isOutsideGHY, setOutsideGHY] = React.useState(false);

   
    const [isLoading, setLoading] = React.useState(false);



    const gstOPTION = [
      {key:'0', value:'' },
      {key:'GST', value:'GST' },
      {key:'NON-GST', value:'NON-GST' }
    ];


    const outSideGHYOPTION = [
      {key:'0', value:'' },
      {key:'GUWAHATI', value:'GUWAHATI' },
      {key:'OUTSIDE-GUWAHATI', value:'OUTSIDE-GUWAHATI' }
    ];


    const tryAgain =  () => {
      setAPIResponse(-1);
    }


    const goToLogin = () => {
      navigation.navigate('Login');
    }


    const checkTextInput = () => {
      //Check for the Name TextInput
      if(dealerLocation == 0) {
        ToastAndroid.show('Choose dealer location ', ToastAndroid.LONG);
        return false;
      } else if (gstNoStatus == 0) {
        ToastAndroid.show('Choose dealer GST status ', ToastAndroid.LONG);
        return false;   
      } else if (!firmName.trim()) {
        ToastAndroid.show('Dealer name is required ', ToastAndroid.LONG);
        return false;
      }  else   if (!contactName.trim()) {
        ToastAndroid.show('Dealer contact person name is required ', ToastAndroid.LONG);
        return false;
      }  else   if (!cityName.trim()) {
        ToastAndroid.show('Dealer city name is required ', ToastAndroid.LONG);
        return false; 
      }  else   if ((!gstNo.trim()) && ( gstNoStatus == "GST")) {
        ToastAndroid.show('Dealer GST no. is required ', ToastAndroid.LONG);
        return false;   
      }  else   if ((gstNo.length < 15) && ( gstNoStatus == "GST")) {
        ToastAndroid.show('Invalid GST number ', ToastAndroid.LONG);
        return false;    
      }  else   if (!dealerMobile.trim()) {
        ToastAndroid.show('Dealer mobile no is required ', ToastAndroid.LONG);
        return false;  
      }  else   if (isNaN(dealerMobile)) {
        ToastAndroid.show('Mobile no should be (10) digit number ', ToastAndroid.LONG);
        return false;  
      }  else   if (dealerMobile.length < 10) {
        ToastAndroid.show('Mobile no should be (10) digit number ', ToastAndroid.LONG);
        return false;   
      }  else   if (!userSetPassword.trim()) {
        ToastAndroid.show('Dealer password is required ', ToastAndroid.LONG);
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


    
    const saveDealer = async () => {
      setAPIResponse(-1);
      //let ip_address = "192.168.96.181" ;  
      //const apiUrl = 'http://'+ ip_address +'/rlu/api/saveDealer.php';
      // const apiUrl = 'https://rluonline.com/api/saveDealer.php';
      //Alert.alert(userSetPassword) ;

      let apiUrl = "";
      if(ConfigData.envType === 0) {
         apiUrl = ConfigData.devBaseURL + 'saveDealer.php';
      } else {
        apiUrl = ConfigData.prodBaseURL + 'saveDealer.php';
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
                firmName: firmName,
                contactName: contactName,
                cityName: cityName,
                dealerLocation: dealerLocation,
                gstStatus: gstNoStatus,
                gstNo: gstNo,
                emailAddress: emailAddress,
                dealerMobile: dealerMobile,
                dealerWhatsApp: dealerWhatsApp,
                userSetPassword: userSetPassword,
              }) 
            });
          const json = await response.json();
          console.log(json);
          setAPIResponse(json.apiResponse);
          setDealerContactPerson(json.dealer_contact_name);
           
         
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error(error);
          
        } finally {
          setLoading(false);
          //setLoading(false);
        }

      }



     
    };
    
    
   
  
   if (apiResponse === -1) {

   
    const handleGstStatusChange = (selectedOption) => {
      
      if(selectedOption == "GST") { 
        setDisabledGST(false);
      } else {
        setDisabledGST(true);
        onChangeGST('');
      }

    };


    const handleLocationStatusChange = (selectedOption) => {
      
      if(selectedOption == "GUWAHATI") { 
        onChangeCity("GUWAHATI");
      } else {
        onChangeCity("");
      }

    };

   /*
    const GstNo = () => {
         
       if(!isDisabledGSTNO) {

         return <TextInput
                style={RegistrationPageStyle.inputTxt}
                onChangeText={(text) => onChangeGST(text) }
                placeholder="Dealer's GST no."
                autoCorrect={false}
                value={gstNo}
                maxLength={15}
                placeholderTextColor="#000"
              />

       } else {
        return null
       }

    };
    */
   
    return(
        <SafeAreaView style={RegistrationPageStyle.appContainer}>
        {/*<Image source={require('../assets/images/qmax.png')} style={RegistrationPageStyle.imageHeader} /> */}
        <Spacer size={30} />    
        <ScrollView  contentInsetAdjustmentBehavior="automatic"    style={RegistrationPageStyle.scrollViewContainer}>
          
                              
                              <View style={{ width:'98%',  padding: 5, margin: 5,  flexDirection: 'column'}} >
                                        <SelectList 
                                                style={{  backgroundColor: '#ffffff' }}
                                                setSelected={(val) => onChangeDealerLocation(val)} 
                                                data={outSideGHYOPTION} 
                                                save="value"
                                                onSelect={() => handleLocationStatusChange(dealerLocation)} 
                                                placeholder="Dealer Location"
                                                placeholderTextColor="#000" 
                                        />
                              </View> 
                              
                              <View style={{ width:'98%', padding: 5, margin: 5,  flexDirection: 'column'}}>
                                        <SelectList 
                                                style={{  backgroundColor: '#ffffff' }}
                                                setSelected={(val) => onChangeGSTstatus(val)} 
                                                data={gstOPTION} 
                                                save="value"
                                                onSelect={() => handleGstStatusChange(gstNoStatus)} 
                                                placeholder="GST Status of the dealer"
                                                placeholderTextColor="#000" 
                                        />
                              </View> 
                      
                  
                            <TextInput
                                style={RegistrationPageStyle.inputTxt}
                                onChangeText={(text) => onChangeFirmName(text)}
                                placeholder="Dealer's Firm Name"
                                autoCorrect={false}
                                value={firmName}
                                placeholderTextColor="#000" 
                            />

                            <TextInput
                                style={RegistrationPageStyle.inputTxt}
                                onChangeText={(text) => onChangeContactName(text) }
                                placeholder="Dealer's Contact Person Name"
                                autoCorrect={false}
                                value={contactName}
                                placeholderTextColor="#000" 
                            />


                            <TextInput
                                style={RegistrationPageStyle.inputTxt}
                                onChangeText={(text) => onChangeCity(text)}
                                placeholder="Dealer's City/Town Name"
                                autoCorrect={false}
                                value={cityName}
                                placeholderTextColor="#000" 
                            />

                          
                            <TextInput
                                style={RegistrationPageStyle.inputTxt}
                                onChangeText={(text) => onChangeGST(text) }
                                placeholder="Dealer's GST no."
                                autoCorrect={false}
                                value={gstNo}
                                editable={!isDisabledGSTNO}
                                maxLength={15}
                                placeholderTextColor="#000" 
                            />
                           

                           {/* <GstNo/> */}

                           <TextInput
                                style={RegistrationPageStyle.inputTxt}
                                onChangeText={(text) => onChangeEmail(text)}
                                placeholder="Dealer's Email address"
                                autoCorrect={false}
                                value={emailAddress}
                                placeholderTextColor="#000" 
                            />

                            <TextInput
                                style={RegistrationPageStyle.inputTxt}
                                onChangeText={(text) => onChangeMobile(text)}
                                placeholder="Dealer Mobile No (Voice)"
                                autoCorrect={false}
                                value={dealerMobile}
                                keyboardType="numeric"
                                maxLength={10}
                                placeholderTextColor="#000" 
                            />


                           <TextInput
                                style={RegistrationPageStyle.inputTxt}
                                onChangeText={(text) => onChangeWhatsApp(text)}
                                placeholder="Dealer WhatsApp No"
                                autoCorrect={false}
                                value={dealerWhatsApp}
                                keyboardType="numeric"
                                maxLength={10}
                                placeholderTextColor="#000" 
                            />


                            <TextInput
                                style={RegistrationPageStyle.inputTxt}
                                onChangeText={(text) => onChangeSetPassword(text)}
                                placeholder="Set Password"
                                secureTextEntry
                                autoCorrect={false}
                                value={userSetPassword}
                                placeholderTextColor="#000" 
                            />


                           <TextInput
                                style={RegistrationPageStyle.inputTxt}
                                onChangeText={(text) =>onChangeCnfPassword(text)}
                                placeholder="Confirm Password"
                                autoCorrect={false}
                                value={userCnfPassword}
                                placeholderTextColor="#000" 
                            />


                        <TouchableOpacity 
                             style = {RegistrationPageStyle.submitButton} 
                             onPress = {() => saveDealer()  }
                             >
                            <Text style = {RegistrationPageStyle.submitButtonText}> Register Now ! </Text>
                        </TouchableOpacity>
                         
                        <Spinner
                          visible={isLoading}
                          textContent={'Saving data'}
                          textStyle={RegistrationPageStyle.spinnerTextStyle}
                        />
                     
                      
                        
         
          
        </ScrollView>
      </SafeAreaView>
    )


   } else if (apiResponse === 0) {
    
   
     return(
            <SafeAreaView style={RegistrationPageStyle.appContainer}>
            <Image source={require('../assets/images/qmax.png')} style={RegistrationPageStyle.imageHeader} /> 
                
            <ScrollView  contentInsetAdjustmentBehavior="automatic"    style={RegistrationPageStyle.scrollViewContainer}>
                <Spacer size={40} />           
                <Text style = {RegistrationPageStyle.orgTitle}>Registration Failed!</Text>         

                  <View style={{ width:'100%', padding: 5, margin: 5, flexDirection: 'row'}}>
                    <Text style={{flexShrink:1,margin:3, fontSize:14 }}>
                      It seems the dealer registration is already done. Kindly contact us at +91-8133047257
                      in case you have registered with us earlier.
                    </Text>
                    
                  </View>              
                            
                <TouchableOpacity 
                             style = {RegistrationPageStyle.submitButton} 
                             onPress = {() => tryAgain()  }
                             >
                            <Text style = {RegistrationPageStyle.submitButtonText}> Back to Registration </Text>
                </TouchableOpacity>          
                            
            
              
            </ScrollView>
            <RegistrationFooter/>
          </SafeAreaView>
          )



   } else if (apiResponse === 1) {

    return (

        <SafeAreaView style={RegistrationPageStyle.appContainer}>
        <Image source={require('../assets/images/qmax.png')} style={RegistrationPageStyle.imageHeader} /> 
            
        <ScrollView  contentInsetAdjustmentBehavior="automatic"    style={RegistrationPageStyle.scrollViewContainer}>
                      
            <Text style = {RegistrationPageStyle.orgTitle}>Registration Successful!</Text>         

              <View style={{ width:'100%', padding: 5, margin: 5, flexDirection: 'column'}}>
                    <Text style={{flexShrink:1,margin:3, fontSize:18 }}>
                        Congratulations  !
                    </Text>
              </View> 

              <View style={{ width:'100%', padding: 5, margin: 5, flexDirection: 'column'}}>
                    <Text style={{flexShrink:1,margin:3, fontSize:18 }}>
                       Your dealer registration has been successfully processed. Welcome to the QMAX family!
                       Please login to your account and start viewing our latest products.
                    </Text>
              </View>              
                        
            <TouchableOpacity 
                         style = {RegistrationPageStyle.submitButton} 
                         onPress = {() => goToLogin()  }
                         >
                        <Text style = {RegistrationPageStyle.submitButtonText}> Back to Login </Text>
            </TouchableOpacity>          
                        
        
          
        </ScrollView>
        <RegistrationFooter/>
      </SafeAreaView>

       )


   }



  }

 
  export default Register;