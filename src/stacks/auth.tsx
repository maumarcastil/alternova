import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack/lib/typescript/src/types';


import SignInPage from '../pages/auth/signin';
import SignUpPage from '../pages/auth/signup';

const Stack = createNativeStackNavigator();

const Auth = () => {
    const screenOptions: NativeStackNavigationOptions = {
        headerShown: false,
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name="signIn" component={SignInPage} />
                <Stack.Screen name="signUp" component={SignUpPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Auth;