import * as React from 'react';
import { Button } from 'native-base'

import { ThemeContext } from '../../context/theme';

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
                bg={themeColors.greenPrimary}
                _pressed={{
                    opacity: 0.9,
                    bg: themeColors.greenSecondary
                }}
                {...props}
            >
                {label}
            </Button >
        </>
    );
}

export default ButtonEntry;