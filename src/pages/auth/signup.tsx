import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { pagesNames } from '../../types/pages';
import { ThemeContext } from '../../context/theme';
import { AuthScreenNavigationProp } from '../../types/navigation';

import Entry from '../../components/inputs/entry';
import SecureEntry from '../../components/inputs/secureEntry';
import ButtonEntry from '../../components/buttons/buttonSubmit';

import { createUser } from '../../firebase';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'

const SignUpPage = () => {
    const { themeColors } = React.useContext(ThemeContext);
    const navigation = useNavigation<AuthScreenNavigationProp>();

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({
        name: '',
        email: '',
        password: '',
    });

    const validateForm = () => {
        if (data.name === '') {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Name is required'
            });
            return false
        }
        if (data.email === '') {
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
    };

    const handleSignUp = async () => {
        try {
            if (!validateForm()) return
            setLoading(true);
            await createUser(data.email, data.password, data.name);
        } catch (error: any) {
            console.log(error);
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
            color: themeColors.textPrimary,
            fontWeight: '600',
            fontSize: 25,
            lineHeight: 34,
        },
        text: {
            color: themeColors.grayPrimary,
            fontWeight: '600',
            fontSize: 14,
            lineHeight: 19,
        },
        redirect: {
            color: themeColors.greenPrimary,
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
                            setData({ ...data, name: e })
                        }} />
                        <Entry placeholder='Email' label='Email' onChangeText={(e) => {
                            setData({ ...data, email: e })
                        }} />
                        <SecureEntry placeholder='Password' label='Password' onChangeText={(e) => {
                            setData({ ...data, password: e })
                        }} />
                        <ButtonEntry my={'2'} label='Sign Up' onPress={handleSignUp} isLoading={loading} />
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