import * as React from 'react';
import { StyleSheet } from 'react-native'
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import Home from './home';
import Auth from './auth';
import { ThemeProvider } from '../context/theme';
import useAuthentication from '../hooks/useAuthentication';

const RootStack = () => {
    const { user } = useAuthentication();

    if (!user) {
        return (
            <>
                <SafeAreaView style={styles.container}>
                    <Auth />
                </SafeAreaView>
            </>
        )
    }
    return (
        <SafeAreaView style={[styles.container]}>
            <Home />
        </SafeAreaView>
    )
}

export default () => {
    return (
        <NativeBaseProvider>
            <ThemeProvider>
                <RootStack />
            </ThemeProvider>
        </NativeBaseProvider>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});