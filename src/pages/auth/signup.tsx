import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { pagesNames } from '../../types/pages';
import { ThemeContext } from '../../context/theme';

import Entry from '../../components/inputs/entry';
import SecureEntry from '../../components/inputs/secureEntry';
import ButtonEntry from '../../components/buttons/buttonSubmit';
import { AuthScreenNavigationProp } from '../../types/navigation';

const SignUpPage = () => {
    const { themeColors } = React.useContext(ThemeContext);
    const navigation = useNavigation<AuthScreenNavigationProp>();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'space-between',
            marginHorizontal: 26,
            backgroundColor: themeColors.background
        },
        containerTitle: {
            marginTop: 41,
            marginBottom: 52,
        },
        containerRedirect: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: 38
        },
        title: {
            color: themeColors.text,
            fontWeight: '600',
            fontSize: 25,
            lineHeight: 34,
        },
        text: {
            color: themeColors.text2,
            fontWeight: '600',
            fontSize: 14,
            lineHeight: 19,
        },
        redirect: {
            color: themeColors.primary,
            fontWeight: '600',
            fontSize: 14,
            lineHeight: 19,
        }
    })

    return (
        <>
            <View style={[styles.container]}>
                <View >
                    <View style={styles.containerTitle} >
                        <Text style={styles.title}>
                            Create an account
                        </Text>
                        <Text style={styles.text}>
                            Connect with your friends today!
                        </Text>
                    </View>

                    <View >
                        <Entry placeholder='Name' label='Name' onChangeText={(e) => {
                            console.log("🚀 ~ file: signin.tsx:63 ~ SignUpPage ~ e:", e)
                        }} />
                        <Entry placeholder='Email' label='Email' onChangeText={(e) => {
                            console.log("🚀 ~ file: signin.tsx:63 ~ SignUpPage ~ e:", e)
                        }} />
                        <SecureEntry placeholder='Password' label='Password' />
                        <ButtonEntry my={'2'} label='Sign Up' />
                    </View>
                </View>

                <View style={styles.containerRedirect} >
                    <TouchableOpacity onPress={() => navigation.navigate(pagesNames.SIGNIN)}>
                        <Text>
                            <Text style={styles.text}>Already have an account ? </Text><Text style={styles.redirect}>Sign In</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </>
    );
}

export default SignUpPage;