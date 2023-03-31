import * as React from 'react';
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import Home from './home';
import { ThemeProvider } from '../context/theme';
import Auth from './auth';

const RootStack = () => {
    const [user, setUser] = React.useState(null);

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
        <ThemeProvider>
            <RootStack />
        </ThemeProvider>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});