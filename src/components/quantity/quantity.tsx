import * as React from 'react';

import { ThemeContext } from '../../context/theme';
import { StyleSheet, Text, View } from 'react-native';
import ButtonEntry from '../buttons/buttonSubmit';

interface QuantityProps {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>
}


const Quantity = ({ quantity, setQuantity }: QuantityProps) => {

    const { themeColors } = React.useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: themeColors.backgroundQuantity,
            borderRadius: 10,
            width: '100%',
            maxWidth: 122
        },
        containerOptions: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 6,
            paddingVertical: 6,
        },
        text: {
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 16,
            lineHeight: 19,
            color: themeColors.greenPrimary,
        }
    });
    return (
        <>
            <View style={styles.container}>
                <View style={styles.containerOptions} >
                    <ButtonEntry
                        w={35}
                        label='-'
                        bg={'#fff'}
                        borderWidth={1}
                        borderRadius={10}
                        borderColor={themeColors.grayPrimary}
                        _text={{
                            color: '#000',
                            ...styles.text
                        }}
                        _pressed={{
                            bg: '#CACACA'
                        }}
                        onPress={() => {
                            if (quantity > 1) {
                                setQuantity(quantity - 1)
                            }
                        }}
                    />
                    <Text style={styles.text}>{quantity}</Text>
                    <ButtonEntry
                        w={35}
                        label='+'
                        bg={'#fff'}
                        borderRadius={10}
                        borderWidth={1}
                        borderColor={themeColors.grayPrimary}
                        color={'#000'}
                        _text={{
                            color: '#000',
                            ...styles.text
                        }}
                        _pressed={{
                            bg: '#CACACA'
                        }}
                        onPress={() => {
                            setQuantity(quantity + 1)
                        }}
                    />
                </View>
            </View>
        </>
    );
}

export default Quantity;