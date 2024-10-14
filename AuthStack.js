import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from "./Login" ;
import Register from "./screens/Register";
const Stack = createNativeStackNavigator();

const AuthStack = () => {
   
    return (
       
                <>
                <Stack.Screen name="Login"  component={Login} options={{headerShown:false}} /> 
                <Stack.Screen name="Register"  
                        component={Register} 
                        options={{ 
                            title: 'QMAX Dealer Registration',
                            headerStyle: { backgroundColor: '#AA4A44' },
                            headerTintColor: '#fff'
                        }} />   
           
                </>
    );
}


export default AuthStack;
