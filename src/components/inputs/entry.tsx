import * as React from 'react';
import { Input, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';


import { ThemeContext } from '../../context/theme';
interface EntryProps extends React.ComponentProps<typeof TextInput> {
    label?: string;
    showLabel?: boolean;
}

const Entry = ({ label, showLabel = true, ...props }: EntryProps) => {

    const { themeColors } = React.useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            marginBottom: 12
        },
        input: {
            borderRadius: 10,
            borderWidth: 1,
            padding: 8,
        },
        label: {
            color: themeColors.textPrimary,
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 19,
            fontSize: 14,
            marginBottom: 7,
        },
    })

    return (
        <>
            <View style={styles.container}>
                {showLabel && <Text style={styles.label} >{label}</Text>}
                <Input
                    type={"text"}
                    borderRadius={10}
                    borderColor={themeColors.borderInput}
                    color={themeColors.textGraySecondary} 
                    placeholderTextColor={themeColors.textGraySecondary}
                    {...props}
                />
            </View>
        </>
    );
}

export default Entry;