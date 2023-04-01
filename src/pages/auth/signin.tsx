import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { pagesNames } from '../../types/pages';
import { ThemeContext } from '../../context/theme';
import { AuthScreenNavigationProp } from '../../types/navigation';

import Entry from '../../components/inputs/entry';
import SecureEntry from '../../components/inputs/secureEntry';
import ButtonEntry from '../../components/buttons/buttonSubmit';

const SignInPage = () => {
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
                            Hi, Wecome Back! 👋
                        </Text>
                        <Text style={styles.text}>
                            Hello again, you’ve been missed!
                        </Text>
                    </View>

                    <View >
                        <Entry placeholder='Email' label='Email' onChangeText={(e) => {
                            console.log("🚀 ~ file: signin.tsx:63 ~ SignInPage ~ e:", e)
                        }} />
                        <SecureEntry placeholder='Password' label='Password' />
                        <ButtonEntry my={'2'} label='Login' />
                    </View>
                </View>

                <View style={styles.containerRedirect} >
                    <TouchableOpacity onPress={() => navigation.navigate(pagesNames.SIGNUP)}>
                        <Text>
                            <Text style={styles.text}>Don’t have an account ? </Text><Text style={styles.redirect}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </>
    );
}

export default SignInPage;