import React, { useEffect, useState, useContext ,useRef } from 'react';
import { HomePageStyle } from "../assets/css/HomePageStyle"
import Spacer  from "../assets/css/Spacer";
import { Card, ListItem,  Icon } from 'react-native-elements'
import Imageloader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import Footer from '../screens/Footer'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { FooterSectionStyle } from "../assets/css/FooterSectionStyle";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut'
import { AuthContext } from '../AuthContext';
import { ConfigData } from '../myconfig.json';
import Spinner from 'react-native-loading-spinner-overlay';
import { SliderBox } from "react-native-image-slider-box";

import {
    SafeAreaView,
    FlatList,
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
    ToastAndroid,
    Alert
  } from 'react-native';
  
  /* Slider Image 1 */
  const sliderImages = [
    require('../assets/images/sliderImg1.jpeg'),
    require('../assets/images/sliderImg2.jpeg'),
    require('../assets/images/sliderImg3.jpeg'),
    require('../assets/images/sliderImg4.jpeg'),
    require('../assets/images/sliderImg5.jpeg'),
    require('../assets/images/sliderImg6.jpeg')
  ];

 



  const Home = ({navigation}) => {
   const ref = useRef();
   const [apiResponse, setAPIResponse] = React.useState(-1); 
   const [isMoreLoading, setMoreLoading] = React.useState(false);
   const { appjwt, 
           setAppJWT, 
           setLogin, 
           setProductName,
           setProductCode,
           setProductImage
          } = useContext(AuthContext);

   let ip_address = "192.168.96.181" ;  
   //const apiUrl = 'http://'+ ip_address +'/rlu/api/getProductListForDealer.php';
   //const apiUrl = 'https://rluonline.com/api/getProductListForDealer.php';

      let apiUrl = "";
      if(ConfigData.envType === 0) {
         apiUrl = ConfigData.devBaseURL + 'getProductListForDealer.php';
      } else {
         apiUrl = ConfigData.prodBaseURL + 'getProductListForDealer.php';
      }

    const [products, setData] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const [pageOffset, setPageOffset] = React.useState(0);

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
    
    const getProductList = async (pageOffset) => {
      setLoading(true);
      try {
        const response = await fetch(apiUrl,  {
            method: 'POST',
            headers: { 
              Accept: 'application/json',
              'Content-Type': 'application/json'
            } ,
            body: JSON.stringify({
              jwt: appjwt,
              pageOffset: pageOffset
            }) 
          });
        const json = await response.json();
        setLoading(false);
        setData(json.product_list);
        if(json.apiResponse === 0) {
          setAppJWT('');
          setLogin(0);
        } else {
          setAPIResponse(json.apiResponse);
          setPageOffset(json.pageOffset);
        }
       
      } catch (error) {
        setLoading(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };


    
    const fetchMoreList = async (pageOffset) => {
      setMoreLoading(true);
      try {
        const response = await fetch(apiUrl,  {
            method: 'POST',
            headers: { 
              Accept: 'application/json',
              'Content-Type': 'application/json'
            } ,
            body: JSON.stringify({
              jwt: appjwt,
              pageOffset: pageOffset
            }) 
          });
        const json = await response.json();
        
        if(json.apiResponse === 0) {
          setAppJWT('');
          setLogin(0);
          setMoreLoading(false);
        } else {
           
          var finalObj = products.concat(json.product_list);
          setMoreLoading(false);
          setData(finalObj);
          
          setAPIResponse(json.apiResponse);
          setPageOffset(json.pageOffset);
      
        }
       
      } catch (error) {
        setMoreLoading(false);
        console.error(error);
      } finally {
        setMoreLoading(false);
      }
    };
  
    
   
   
    useEffect(() => {
      getProductList(pageOffset);
    }, []);


    const placeOrder = (part_no, product_name, product_image) => {
      setProductCode(part_no);
      setProductName(product_name);
      setProductImage(product_image);
      navigation.navigate('Procurement'); 
    };


    const signOut = () => {
      showAlert();
      //BackHandler.exitApp();
    };

    const loadMoreData = () => {
      // ToastAndroid.show("Loading more !", ToastAndroid.LONG);
      //fetchMoreList(pageOffset);
    } 


   


      const search = () => {
       navigation.navigate('SearchProduct');
      };

      const goToLogin = () => {
        setAppJWT('');
        setLogin(0);
      };
  
    if(apiResponse === 0) {
      ToastAndroid.show('Your session expired ', ToastAndroid.LONG);
      setLogin(0);

    } else {
  
     
        return(
            <SafeAreaView style={HomePageStyle.appContainer}>
           {/* <Image source={require('../assets/images/qmax_banner.png')} style={HomePageStyle.imageHeader} /> */}
            <SliderBox 
                images={sliderImages} 
                sliderBoxHeight={250} 
                resizeMode={'center'} 
                resizeMethod={'resize'}  activeOpacity={0.5}  
                dotColor="#000000"  
                inactiveDotColor="#FFA4AE" 
                autoplay
                circleLoop 
                ImageComponentStyle={{ width: '100%', marginTop: 1, backgroundColor: '#ffffff'}}
              />
            {
                  isLoading ? (
                    <>
                    <Spacer size={40} />
                    <ActivityIndicator size="large" color="#00ff00"  />
                    </>
                  ) :
                
            <FlatList
               ref={ref}
               data = { products }
               onEndReached={loadMoreData}
               onEndReachedThreshold ={0.1}
               renderItem = { ({item}) => (
                      <>
                      <Card>
                      {/* <Card.Title> <Text style={HomePageStyle.productNameText}>{item.product_name}</Text></Card.Title> */}
                      <Card.Divider/>
                  
                      <View  >
                        
                            
                              <Imageloader
                                  style={HomePageStyle.imageProduct}
                                  indicator={ProgressBar}
                                  resizeMode="center"
                                  source={{uri: item.productImage}}
                               />
                              <Text style = {HomePageStyle.sectionDescription}>Part No : {item.part_no}</Text>
                              <Text style = {HomePageStyle.sectionDescription}>Series : {item.series_type}</Text>
                              <Text style = {HomePageStyle.sectionDescription}>Design No./Name : {item.design_no_name}</Text> 
                              <Text style = {HomePageStyle.sectionDescription}>Size : {item.product_size} mm</Text>
                              <Text style = {HomePageStyle.sectionDescription}>Size in Inch : {item.product_size_inches} "</Text>
                              <Text style = {HomePageStyle.sectionDescription}>Packing per box  : {item.item_per_box}</Text>
                              <Text style = {HomePageStyle.sectionDescription}>Sq.ft per box  : {item.sqr_ft_per_box}</Text>
                              <Text style = {HomePageStyle.sectionDescription}>Finish Type : {item.finish}</Text>
                              <Text style = {HomePageStyle.sectionDescription}>Category : {item.primary_category}</Text>
                              <Text style = {HomePageStyle.sectionDescription}>Product Type : {item.secondary_category}</Text>
                              <Text style = {HomePageStyle.sectionDescription}>Godown No.1  : {item.godown_1}</Text>
                              <Text style = {HomePageStyle.sectionDescription}>Godown No.2  : {item.godown_2}</Text>
                              <Text style = {HomePageStyle.sectionDescription}>Already Booked  : {item.stock_booked}</Text>
                              <Text style = {HomePageStyle.sectionDescription}>In-Transit  : {item.in_transit}</Text>
                              <TouchableOpacity
                                  style = {HomePageStyle.submitButton}
                                  onPress = {() => placeOrder(item.part_no, item.product_name, item.productImage) }
                                >
                                  <Text style = {HomePageStyle.submitButtonText}> Place Order Now </Text>
                              </TouchableOpacity>
                      </View>  
                  
                  </Card>

                  <Spacer size={40} />

                    
                  </> 
               )}
            />  
           
           }

                 <Spinner
                            visible={isMoreLoading}
                            textContent={'Loading more product'}
                            textStyle={HomePageStyle.spinnerTextStyle}
                    />



           <Footer navigation = { navigation } ></Footer>
          
          </SafeAreaView>
        );

     }   
  }

 
  export default Home;