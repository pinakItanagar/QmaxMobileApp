import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "./screens/Home" ;

import SearchProduct from "./screens/SearchProduct";
import SearchResult from "./screens/SearchResult";
const Stack = createNativeStackNavigator();

const AppStack = () => {
   
    return (
       
            
               <>
                <Stack.Screen name="Home"  
                        component={Home} 
                        options={{ 
                            title: 'QMAX Dealer Catalouge',
                            headerStyle: { backgroundColor: '#AA4A44' },
                            headerTintColor: '#fff'
                        }} />
               

                     <Stack.Screen name="SearchProduct"  
                        component={SearchProduct} 
                        options={{ 
                            title: 'QMAX Product Search',
                            headerStyle: { backgroundColor: '#AA4A44' },
                            headerTintColor: '#fff'
                        }} />  


                    <Stack.Screen name="SearchResult"  
                        component={SearchResult} 
                        options={{ 
                            title: 'QMAX Search Result',
                            headerStyle: { backgroundColor: '#AA4A44' },
                            headerTintColor: '#fff'
                        }} /> 

           
               </> 
    );
}


export default AppStack;
