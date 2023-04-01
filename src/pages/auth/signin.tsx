import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { pagesNames } from '../../types/pages';
import { ThemeContext } from '../../context/theme';
import { AuthScreenNavigationProp } from '../../types/navigation';

import Entry from '../../components/inputs/entry';
import SecureEntry from '../../components/inputs/secureEntry';
import ButtonEntry from '../../components/buttons/buttonSubmit';
import { signIn } from '../../firebase';

const SignInPage = () => {
    const { themeColors } = React.useContext(ThemeContext);
    const navigation = useNavigation<AuthScreenNavigationProp>();

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({
        email: '',
        password: '',
    });

    const validateForm = () => {
        if (data.email === '' || data.email.trim() === '') {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Email is required'
            });
            return false
        }
        if (data.password === '') {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Password is required'
            });
            return false
        }
        return true
    }

    const handleSignIn = async () => {
        try {
            setLoading(true);
            if (!validateForm()) return
            await signIn(data.email, data.password);
        } catch (error: any) {
            console.log("🚀 ~ file: signin.tsx:46 ~ handleSignIn ~ error:", error)
        } finally {
            setLoading(false);
        }
    };

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
                            setData({ ...data, email: e })
                        }} />
                        <SecureEntry placeholder='Password' label='Password' onChangeText={(e) => {
                            setData({ ...data, password: e })
                        }} />
                        <ButtonEntry my={'2'} label='Login' isLoading={loading} onPress={handleSignIn} />
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