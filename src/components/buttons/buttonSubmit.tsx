import * as React from 'react';
import { Button } from 'native-base'
import { StyleSheet, Text, View } from 'react-native'

import { ThemeContext } from '../../context/theme';
import { theme } from '../../config/theme';

interface ButtonEntryProps extends React.ComponentProps<typeof Button> {
    label?: string;
}

const ButtonEntry = ({
    label,
    ...props
}: ButtonEntryProps) => {
    const { themeColors } = React.useContext(ThemeContext);

    return (
        <>
            <Button
                backgroundColor={themeColors.primary}
                {...props}
            >
                {label}
            </Button >
        </>
    );
}

export default ButtonEntry;