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

  const Orderhistory = ({navigation}) => {

    const { appjwt, setScreenContent, orderListRefresh, setOrderListRefresh } = useContext(AuthContext); 
    const [isSearching, setSearching] = React.useState(false);
    const [orders, setOrder] = React.useState([]);
    const [orderSearchType, setOrderSearchType] = React.useState('PENDING');
    const [apiResponse, setAPIResponse] = React.useState(-1); 

    let apiUrl = "";
    if(ConfigData.envType === 0) {
       apiUrl = ConfigData.devBaseURL + 'getOrderHistory.php';
    } else {
      apiUrl = ConfigData.prodBaseURL + 'getOrderHistory.php';
    }

    const getOrder = async () => { 

        try {
            const response = await fetch(apiUrl,  {
                method: 'POST',
                headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jwt: appjwt,
                    orderSearchType: orderSearchType
                })   
            });
            const json = await response.json();
            console.log("ORDER HISTORY RESULT " + json.order_list);
            setOrder(json.order_list)
            setAPIResponse(json.apiResponse);
           
            /*
            if(json.apiResponse === 1) {
                setScreenContent(1);
            } else if(json.apiResponse === 2) {
                ToastAndroid.show('Requested item not found !', ToastAndroid.LONG);
                setScreenContent(0);
            } else if(json.apiResponse === 0) {
                setLogin(0);
            }
            */

        } catch (error) {
            setSearching(false);
            console.error(error);
        }

    }

   

    if(orderListRefresh === 0) {

      useEffect(() => {
        getOrder();
      }, []);
      
    }

    if(apiResponse == "1") {
        return (
        <SafeAreaView style={RegistrationPageStyle.appContainer}>
           <Image source={require('../assets/images/qmax_banner.png')} style={HomePageStyle.imageHeader} /> 
            

           <FlatList
                  
                  data = { orders }
                  
                  renderItem = { ({item}) => (
                      <>
                          <Card>
                                <Card.Divider/>
                      
                                    <View  >
                                        
                                            <Imageloader
                                                style={HomePageStyle.imageProduct}
                                                indicator={ProgressBar}
                                                resizeMode="center"
                                                source={{uri: item.productImage}}
                                            />
                                            <Text style = {HomePageStyle.sectionDescription}>Product Ordered : {item.product_name}</Text> 
                                            <Text style = {HomePageStyle.sectionDescription}>Order Date : {item.order_date}</Text>
                                            <Text style = {HomePageStyle.sectionDescription}>Order No : {item.order_number}</Text>
                                            <Text style = {HomePageStyle.sectionDescription}>Part No : {item.part_no}</Text>
                                            <Text style = {HomePageStyle.sectionDescription}>Size : {item.product_size} mm</Text>
                                            <Text style = {HomePageStyle.sectionDescription}>Box Required : {item.box_required} </Text>
                                            <Text style = {HomePageStyle.sectionDescription}>Order Status : {item.order_status}</Text>
                                            <Text style = {HomePageStyle.sectionDescription}>QTY Deviation : {item.box_required_updated}</Text>
                                           
                                        
                                    </View>  
                      
                          </Card>

                          <Spacer size={40} />
 
                      </> 
                    )}
              />  


           <Footer navigation = { navigation } ></Footer>
        </SafeAreaView>

        );
    }



  }

  export default Orderhistory;