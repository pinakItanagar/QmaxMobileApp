import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity , Alert, BackHandler} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FooterSectionStyle } from "../assets/css/FooterSectionStyle"

const Tab = createMaterialBottomTabNavigator();



const RegistrationFooter = ({navigation}) => {

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress",()=>{
          BackHandler.exitApp();
        });
      }, []);

    const signOut = () => {
          BackHandler.exitApp();
    };


    const loginPage = () => {
        navigation.navigate('Login');
     };


  return (

        <View style={FooterSectionStyle.footerContainer} >
            <View  style={FooterSectionStyle.iconContainer} >
               {/* */} 
            </View>



            <View  style={FooterSectionStyle.iconContainer} >
               {/* */} 
            </View>

         
            <View  style={FooterSectionStyle.iconContainer} >
               {/* */} 
            </View>
           

            <View style={FooterSectionStyle.iconContainer} >
                 <TouchableOpacity onPress = {() => signOut()  }>
                       <FontAwesomeIcon icon={ faSignOut } size={30} color={ '#fff' } />
                 </TouchableOpacity>
            </View>
        </View>
     
    
  );
}

export default RegistrationFooter;