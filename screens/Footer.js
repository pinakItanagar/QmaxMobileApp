import React, { useEffect , useContext, useRef } from 'react';
import { Text, View, TouchableOpacity , Alert, BackHandler} from 'react-native';
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons/faQrcode'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FooterSectionStyle } from "../assets/css/FooterSectionStyle"
import { NavigationScreenProps } from "react-navigation";
import { AuthContext } from '../AuthContext';




const Footer = ({navigation}) => {

  

  const { 
          setAppJWT , 
          setLogin,  
          setScreenContent, 
          setSelectedTileSize,
          setSelectedCategoryOne,
          setSelectedProductType,
          setSelectedFinish,
          onChangeDesignNo,
          setOrderListRefresh,
          setQTYReq,
          setQRCodeScan,
          setScanResult 
        } = useContext(AuthContext);


     useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress",() => {
          BackHandler.exitApp();
        });
      }, []);


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
        showAlert();
      };    
       
  

      const goToProfile = () => {
        navigation.navigate('Profile'); 
      };

      const goToHome = () => {
        navigation.navigate('Home'); 
      };

      const search = () => {
        setScreenContent(-1);
        setSelectedTileSize("");
        setSelectedCategoryOne("");
        setSelectedProductType("");
        setSelectedFinish("");
        onChangeDesignNo("");
        setQTYReq(0);
        navigation.navigate('SearchProduct');

      };


     const orderHistory = () => {
       setOrderListRefresh(0);
       navigation.navigate('Orderhistory');
     };

     const scanQRCode = () => {
      setQRCodeScan(true);
      setScanResult(false);
      navigation.navigate('Qrcodescanner');
     }



  return (

      <View style={FooterSectionStyle.footerContainer} >

        <View  style={FooterSectionStyle.iconContainer} >
          <TouchableOpacity onPress = {() => goToHome()  }>
            <FontAwesomeIcon icon={ faHome } size={25} color={ '#fff' } />
          </TouchableOpacity>  
        </View>

        <View  style={FooterSectionStyle.iconContainer} >
          <TouchableOpacity onPress = {() => goToProfile()  }>
            <FontAwesomeIcon icon={ faUser } size={25} color={ '#fff' } />
          </TouchableOpacity>  
        </View>

        <View style={FooterSectionStyle.iconContainer} >
            <TouchableOpacity onPress = {() => scanQRCode()  }>
              <FontAwesomeIcon icon={ faQrcode } size={25} color={ '#fff' } />
            </TouchableOpacity> 
        </View>

        <View style={FooterSectionStyle.iconContainer} >
            <TouchableOpacity onPress = {() => orderHistory()  }>
              <FontAwesomeIcon icon={ faCartShopping } size={30} color={ '#fff' } />
            </TouchableOpacity> 
        </View>

        <View style={FooterSectionStyle.iconContainer} >
            <TouchableOpacity onPress = {() => search()  }>
              <FontAwesomeIcon icon={ faSearch } size={25} color={ '#fff' } />
            </TouchableOpacity> 
        </View>

        {/*
        <View style={FooterSectionStyle.iconContainer} >
            <TouchableOpacity onPress = {() => signOut()  }>
                  <FontAwesomeIcon icon={ faSignOut } size={25} color={ '#fff' } />
            </TouchableOpacity>
        </View>
      */}
      </View>
     
    
  );
}

export default Footer;