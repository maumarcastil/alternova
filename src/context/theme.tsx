import * as React from 'react';
import { useColorScheme } from 'react-native';
import { theme as customTheme } from '../config/theme';

interface ThemeProviderProps {
    children: React.ReactNode;
}

interface ThemeContextProps {
    theme: string;
    themeColors: typeof customTheme['light'];
}

export const ThemeContext = React.createContext<ThemeContextProps>({
    theme: 'light',
    themeColors: customTheme['light'],
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const colorScheme = useColorScheme();
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

    React.useEffect(() => {
        if (colorScheme === 'dark') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, [colorScheme]);

    return (
        <ThemeContext.Provider value={{
            theme,
            themeColors: customTheme[theme],
        }}>
            {children}
        </ThemeContext.Provider>
    )
};
