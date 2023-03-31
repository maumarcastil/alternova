import * as React from 'react';
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Home = () => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={() => (
                        <Text>Home</Text>
                    )} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

export default Home;