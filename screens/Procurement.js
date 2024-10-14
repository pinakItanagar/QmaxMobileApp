import React, { useEffect, useState, useContext } from 'react';
import { HomePageStyle } from "../assets/css/HomePageStyle"
import Spacer  from "../assets/css/Spacer";
import { Card, ListItem,  Icon } from 'react-native-elements'
import Imageloader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Footer from '../screens/Footer'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FooterSectionStyle } from "../assets/css/FooterSectionStyle";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, width } from '@fortawesome/free-solid-svg-icons/faUser'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut'
import { RegistrationPageStyle } from "../assets/css/RegistrationPageStyle"
import { SelectList } from 'react-native-dropdown-select-list'
import { AuthContext } from '../AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
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
    BackHandler,
    Alert,
    ToastAndroid
  } from 'react-native';

  

 

  


  const Procurement = ({navigation}) => {

   const [boxNo, onChangeBoxNo] = React.useState("");
   const [orderNo, setOrderNo] = React.useState("");
   const [isLoading, setLoading] = React.useState(false); 
   const [apiResponse, setAPIResponse] = React.useState(-1); 


   const { appjwt, 
    setAppJWT, 
    setLogin, 
    productName,
    productCode,
    productImage
    } = useContext(AuthContext); 

   
 
  


   const checkTextInput = () => {
    
    if ((boxNo.length == 0) || ( parseInt(boxNo) == 0)) {
      ToastAndroid.show('Provide valid box no. ', ToastAndroid.LONG);
      return false;
    } else {
      return true;
    }
    
  };




   let ip_address = "192.168.96.181" ;  
   //const apiUrl = 'http://'+ ip_address +'/rlu/api/dealerOrder.php';
   //const apiUrl = 'https://rluonline.com/api/dealerOrder.php';

     let apiUrl = "";
      if(ConfigData.envType === 0) {
         apiUrl = ConfigData.devBaseURL + 'dealerOrder.php';
      } else {
        apiUrl = ConfigData.prodBaseURL + 'dealerOrder.php';
      }

   
    
    const confirmOrder = async (product_name, design_no, product_image, box_required ) => {
        setLoading(true);
        if(checkTextInput()) {   
  
            try {
                const response = await fetch(apiUrl,  {
                    method: 'POST',
                    headers: { 
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    jwt: appjwt,
                    productName: product_name,
                    design_no: design_no,
                    product_image: product_image,
                    box_required : box_required
                    })   
                });
                const json = await response.json();
                setLoading(false);
                setAPIResponse(json.apiResponse);
                setOrderNo(json.order_number);

               if(json.apiResponse === 2) {
                    ToastAndroid.show('Requested item not found !', ToastAndroid.LONG);
                } else if(json.apiResponse === 0) {
                    setLogin(0);
                }


            } catch (error) {
                setLoading(false);
                console.error(error);
            } finally {
                setLoading(false);
            }

           
        } else {
            setLoading(false);
        }    
    };
    
   
   


   const goToLogin = () => {
       setAppJWT('');
       setLogin(0);
   };

   const goToHome = () => {
    navigation.navigate('Home'); 
   }


   /*
   const searchAgain = () => {
    navigation.navigate('SearchProduct'); 
   }

  

   const showAlert = () =>
      Alert.alert(
        'Qmax App',
        'Are you sure to exit',
        [
          {
            text: 'Yes',
            onPress: () => {   
              setAppJWT('');
              setLogin(0);BackHandler.exitApp() 
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
      //BackHandler.exitApp();
      showAlert();
    };

    */

   
  
      if(apiResponse === -1 )  {
        
         return(

            <SafeAreaView style={RegistrationPageStyle.appContainer}>
                            <Image source={require('../assets/images/qmax.png')} style={RegistrationPageStyle.imageHeader} /> 
                                
                            <ScrollView  contentInsetAdjustmentBehavior="automatic"    style={RegistrationPageStyle.scrollViewContainer}>
                                        
                                <View style={{ paddingLeft:10, paddingRight:10}}>        
                                <Text style = {RegistrationPageStyle.orgTitle}>QMAX PRODUCT PROCUREMENT</Text>         
                    
                                <Imageloader
                                            style={HomePageStyle.imageProduct}
                                            indicator={ProgressBar}
                                            resizeMode="center"
                                            source={{uri: productImage}}
                                        />
                                    
                                <Text style = {HomePageStyle.sectionDescription}>Name : {productName}</Text> 
                                <Text style = {HomePageStyle.sectionDescription}>Part No. : {productCode}</Text> 
                                  

                               

                                <View style={{ width:'98%', padding: 5, margin: 5, flexDirection: 'column'}}>
                                            <TextInput
                                            style={RegistrationPageStyle.inputTxt}
                                            onChangeText={(text) => onChangeBoxNo(text)}
                                            placeholder="No of box required"
                                            keyboardType="numeric"
                                            autoCorrect={false}
                                            value={boxNo}
                                        />
                                </View>


                                
                                
                                            
                                <TouchableOpacity 
                                            style = {HomePageStyle.submitButton} 
                                            onPress = {() => confirmOrder(productCode, productName, productImage, boxNo )  }
                                            >
                                            <Text style = {HomePageStyle.submitButtonText}>Submit </Text>
                                </TouchableOpacity>  
                             
                                <Spacer size={50} /> 

                                <Spinner
                                visible={isLoading}
                                textContent={'Sending order details...'}
                                textStyle={RegistrationPageStyle.spinnerTextStyle}
                                />

                             </View>   

 
                            
                            
                            </ScrollView>

                          

                          {/* <Footer navigation = { navigation } ></Footer> */}
                            
                        </SafeAreaView>

         )
      }  else if(apiResponse === 1 ) {
         
         return (

            <SafeAreaView style={HomePageStyle.appContainer}>
            <Image source={require('../assets/images/qmax_banner.png')} style={HomePageStyle.imageHeader} /> 
                
            <ScrollView  contentInsetAdjustmentBehavior="automatic"  style={HomePageStyle.appContainer}>
            
           

              <Card>       
                  <Card.Title> <Text style={HomePageStyle.productNameText}>Order Confirmed !</Text></Card.Title>
                  <Card.Divider/>
                    <View style={{ paddingLeft:10, paddingRight:10}}>  
                    <Text style = {HomePageStyle.sectionDescription}>Dear Dealer !</Text> 
                    <Text style = {HomePageStyle.sectionDescription}>We wish to confirm that your order details for {productName} has been successfully placed. </Text> 
                    <Text style = {HomePageStyle.sectionDescription}>Order reference no is  #{orderNo}. </Text> 
                  </View>  

                  <Spacer size={40} />

                  <TouchableOpacity 
                   style = {HomePageStyle.submitButton}
                   onPress = {() => goToHome()  }
                    >
                      <Text style = {HomePageStyle.submitButtonText}> Back to Product Listing</Text>
                   </TouchableOpacity>
                                              
              </Card> 


                             
            
            <Spacer size={40} />
            </ScrollView>
            
           
           <Footer navigation = { navigation } ></Footer>


            </SafeAreaView> 

         )
        

      }
       

      
   
  }

 
  export default Procurement;