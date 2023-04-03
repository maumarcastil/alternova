import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { ThemeContext } from '../../context/theme';

const HomePage = () => {
    const { themeColors } = React.useContext(ThemeContext);
    return (
        <>
            <View style={[styles.container, { backgroundColor: themeColors.background }]}>
                <Text>
                    HomePage
                </Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})



export default HomePage;