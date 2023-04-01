import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack/lib/typescript/src/types';


import SignInPage from '../pages/auth/signin';
import SignUpPage from '../pages/auth/signup';
import { ThemeContext } from '../context/theme';
import { pagesNames } from '../types/pages';
import { AuthStackParamList } from '../types/navigation';


const Stack = createNativeStackNavigator<AuthStackParamList>();

const Auth = () => {
    const { themeColors } = React.useContext(ThemeContext);

    const screenOptions: NativeStackNavigationOptions = {
        headerShown: false,
        contentStyle: {
            backgroundColor: themeColors.background,
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name={pagesNames.SIGNIN} component={SignInPage} />
                <Stack.Screen name={pagesNames.SIGNUP} component={SignUpPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Auth;