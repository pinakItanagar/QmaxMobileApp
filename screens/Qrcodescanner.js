import React, { useEffect, useState, useContext } from 'react';
import { HomePageStyle } from "../assets/css/HomePageStyle"
import Spacer  from "../assets/css/Spacer";
import { Card } from 'react-native-elements'
import Imageloader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Footer from '../screens/Footer'
import { RegistrationPageStyle } from "../assets/css/RegistrationPageStyle"
import { SelectList } from 'react-native-dropdown-select-list'
import { AuthContext } from '../AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { ConfigData } from '../myconfig.json';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

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

  const Qrcodescanner = ({navigation}) => {

    const { appjwt,  scan, setQRCodeScan, scanResult, setScanResult, setAppJWT, setLogin } = useContext(AuthContext); 
    const [isSearching, setSearching] = React.useState(false);
    const [product, setProduct] = React.useState([]);
    const [apiResponse, setAPIResponse] = React.useState(-1); 
   
    
    const [scanData, setScanData] = React.useState('');

   

    let apiUrl = "";
    if(ConfigData.envType === 0) {
       apiUrl = ConfigData.devBaseURL + 'getProductDetailsbyPartNo.php';
    } else {
       apiUrl = ConfigData.prodBaseURL + 'getProductDetailsbyPartNo.php';
    }

    const getProductDetails = async ( part_no ) => { 
        
       
        try {
            const response = await fetch(apiUrl,  {
                method: 'POST',
                headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jwt: appjwt,
                    part_no: part_no
                })   
            });
            const json = await response.json();
            console.log("Product Details " + json.product_details);
            setSearching(false);
            if(json.jwt == "") {
                logOut();
            } else {
                setProduct(json.product_details);
                setAPIResponse(json.apiResponse);
            }
       
        } catch (error) {
            setSearching(false);
            console.error(error);
        }
       
    }

    const logOut = () => {
        setAppJWT('');
        setLogin(0);
    };  

   
    const showResult = (data) => {
        setScanData(data);
        setScanResult(true);
        setQRCodeScan(false);
        setSearching(true);
        getProductDetails(data);
    }
  

    if((scan == true ) && (scanResult == false)) {
        return (
        <SafeAreaView style={RegistrationPageStyle.appContainer}>
           <Image source={require('../assets/images/qmax_banner.png')} style={HomePageStyle.imageHeader} /> 
            
           <QRCodeScanner
                reactivate={true}
                showMarker={true}
                onRead={({data}) => showResult(data)}
               // flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                    <Text >
                       
                        <Text >Scan the QR Code</Text>
                    </Text>
                }
                bottomContent= {
                    <TouchableOpacity >
                        <Text >OK. Got it!</Text>
                    </TouchableOpacity>
                }
            />
          

           <Footer navigation = { navigation } ></Footer>
        </SafeAreaView>

        );
    } else if((scan == false ) && (scanResult == true) && (apiResponse == '1')) {
        return (
            <SafeAreaView style={RegistrationPageStyle.appContainer}>
               <Image source={require('../assets/images/qmax_banner.png')} style={HomePageStyle.imageHeader} /> 
               <Spacer size={30} />
               <ScrollView     style={RegistrationPageStyle.scrollViewContainer}> 
                    <Card>
                            
                                <View  >

                                        <Spinner
                                            visible={isSearching}
                                            textContent={'Searching the product'}
                                            textStyle={RegistrationPageStyle.spinnerTextStyle}
                                            />      
                                    
                                        
                                        <Imageloader
                                            style={HomePageStyle.imageProduct}
                                            indicator={ProgressBar}
                                            resizeMode="center"
                                            source={{uri: product.productImage}}
                                        />
                                        <Text style = {HomePageStyle.sectionDescription}>Part No : {product.part_no}</Text>
                                        <Text style = {HomePageStyle.sectionDescription}>Design No./Name : {product.design_no_name}</Text> 
                                        <Text style = {HomePageStyle.sectionDescription}>Size : {product.product_size} mm</Text>
                                        <Text style = {HomePageStyle.sectionDescription}>Size in Inch : {product.product_size_inches} "</Text>
                                        <Text style = {HomePageStyle.sectionDescription}>Packing per box  : {product.item_per_box}</Text>
                                        <Text style = {HomePageStyle.sectionDescription}>Sq.ft per box  : {product.sqr_ft_per_box}</Text>
                                        <Text style = {HomePageStyle.sectionDescription}>Finish Type : {product.finish}</Text>
                                        <Text style = {HomePageStyle.sectionDescription}>Category : {product.primary_category}</Text>
                                        <Text style = {HomePageStyle.sectionDescription}>Product Type : {product.secondary_category}</Text>
                                        <Text style = {HomePageStyle.sectionDescription}>Godown No.1  : {product.godown_1}</Text>
                                        <Text style = {HomePageStyle.sectionDescription}>Godown No.2  : {product.godown_2}</Text>
                                        <Text style = {HomePageStyle.sectionDescription}>Already Booked  : {product.stock_booked}</Text>
                                        <Text style = {HomePageStyle.sectionDescription}>In-Transit  : {product.in_transit}</Text>
                                        {/*
                                        <TouchableOpacity
                                            style = {HomePageStyle.submitButton}
                                            onPress = {() => placeOrder(item.part_no, item.product_name, item.productImage) }
                                            >
                                            <Text style = {HomePageStyle.submitButtonText}> Place Order Now </Text>
                                        </TouchableOpacity>
                                        */}
                                </View>  
                            
                    </Card>
                    <Spacer size={60} />
                </ScrollView>  
                
                
              
    
               <Footer navigation = { navigation } ></Footer>
            </SafeAreaView>
    
            );

    } else if((scan == false ) && (scanResult == true) && (apiResponse == '0')) {
        return (
            <SafeAreaView style={RegistrationPageStyle.appContainer}>
               <Image source={require('../assets/images/qmax_banner.png')} style={HomePageStyle.imageHeader} /> 
               <Spacer size={30} />
               <ScrollView     style={RegistrationPageStyle.scrollViewContainer} > 
                    <Card>
                            
                                <View  >

                                        <Spinner
                                            visible={isSearching}
                                            textContent={'Searching the product'}
                                            textStyle={RegistrationPageStyle.spinnerTextStyle}
                                            />      
                                    
                                        
                                       
                                        <Text style = {HomePageStyle.sectionMessage}>Product not found !</Text>
                                    
                                </View>  
                            
                    </Card>
                   
                </ScrollView>  
                
                
              
    
               <Footer navigation = { navigation } ></Footer>
            </SafeAreaView>
    
            );

    }



  }

  export default Qrcodescanner;