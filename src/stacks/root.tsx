import * as React from 'react';
import { StyleSheet } from 'react-native'
import { NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import Home from './home';
import Auth from './auth';
import { ThemeProvider } from '../context/theme';
import useAuthentication from '../hooks/useAuthentication';

import '../firebase/firebaseConfig'
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { persistor, store } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';


const RootStack = () => {
    const { user } = useAuthentication();

    if (!user) {
        return (
            <SafeAreaView style={styles.container}>

                <Auth />
                <Toast
                    position='top'
                />
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={[styles.container]}>
            <Home />
            <Toast
                position='top'
            />
        </SafeAreaView>
    )
}

export default () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NativeBaseProvider>
                    <ThemeProvider>
                        <RootStack />
                    </ThemeProvider>
                </NativeBaseProvider>
            </PersistGate>
        </Provider>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});