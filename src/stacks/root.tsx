import * as React from 'react';
import { Appearance } from 'react-native'

import Home from './home';

const RootStack = () => {

    const [user, setUser] = React.useState(null);

    const colorScheme = Appearance.getColorScheme();
    console.log("🚀 ~ file: root.tsx:8 ~ RootStack ~ colorScheme:", colorScheme)


    /* if (!user) (
        return (
        <>

        </>
    ) */

    return (
        <Home />
    )
}


export default () => {
    return (
        <RootStack />
    )
};