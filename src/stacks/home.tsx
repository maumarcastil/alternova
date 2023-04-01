import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack/lib/typescript/src/types';

import ShopPage from '../pages/home/shop';
import { pagesNames } from '../types/pages';
import { ThemeContext } from '../context/theme';
import ItemDetails from '../pages/home/itemDetails';

const Stack = createNativeStackNavigator();

const Home = () => {
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
                
                <Stack.Group>
                    <Stack.Screen name={pagesNames.SHOP} component={ShopPage} />
                </Stack.Group>

                <Stack.Group screenOptions={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                }}>
                    <Stack.Screen name={pagesNames.ITEM_DETAILS} component={ItemDetails} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Home;