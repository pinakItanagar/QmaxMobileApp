import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import Login from "./Login" ;
import Home from "./screens/Home" ;
import Register from "./screens/Register";
import SearchProduct from "./screens/SearchProduct";
import { AuthProvider } from './AuthContext';
import Nav from './Nav';




const AppPro = () => {
    
    const Stack = createNativeStackNavigator();

   

    return(
        <AuthProvider>
            <Nav/>
        </AuthProvider>

    );

   
  }

 
  export default AppPro;