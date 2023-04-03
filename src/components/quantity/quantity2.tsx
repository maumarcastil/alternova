import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Actionsheet, useDisclose } from 'native-base';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ButtonEntry from '../buttons/buttonSubmit';
import { ThemeContext } from '../../context/theme';
import { ProductWithQuantity, addItemTocart, removeItemToCart, removerQuantity } from '../../redux/slices/cart';

interface QuantityProps {
    quantity: number;
    item: ProductWithQuantity;
}

const Quantity2 = ({ item, quantity }: QuantityProps) => {
    const { themeColors } = React.useContext(ThemeContext);

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    const dispatch = useDispatch();

    const addQuantity = () => {
        dispatch(addItemTocart({
            ...item,
            quantity: 1
        }))
    }

    const removeQuantity = () => {
        if (quantity > 1) {
            dispatch(removerQuantity({
                ...item,
                quantity: item.quantity - 1
            }))
        } else {
            onOpen();
        }
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: themeColors.border,
            borderRadius: 10,
            width: '100%',
            maxWidth: 122
        },
        containerOptions: {
            width: '100%',
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
        },
        btn: {
            width: 21,
            height: 21,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: themeColors.grayPrimary,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },

        /* modal */
        containerButtonModal: {
            width: '100%',
            marginBottom: 10,
        },
        textModal: {
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 16,
            lineHeight: 19,
            marginBottom: 10,

            color: themeColors.textBlackAndWhite,
        }
    });
    return (
        <>
            <View style={styles.containerOptions} >
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        removeQuantity();
                    }}
                >
                    <Text style={styles.text}>-</Text>
                </TouchableOpacity>

                <Text style={styles.text}>{quantity}</Text>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        addQuantity();
                    }}
                >
                    <Text style={styles.text}>+</Text>
                </TouchableOpacity>
            </View>

            <Actionsheet isOpen={isOpen} onClose={onClose} >
                <Actionsheet.Content w={'100%'} background={themeColors.backgroundModal} >
                    <Text style={styles.textModal}>
                        Are you sure you want to delete this article?
                    </Text>
                    <View style={styles.containerButtonModal}>
                        <ButtonEntry
                            label='Cancel'
                            width={'100%'}
                            borderRadius={10}
                            variant={'outline'}
                            backgroundColor={'transparent'}
                            _text={{
                                fontWeight: '700',
                                color: themeColors.textBlackAndWhite
                            }}
                            _pressed={{
                                backgroundColor: themeColors.primary,
                                _text: {
                                    color: '#fff',
                                }
                            }}
                            onPress={() => {
                                onClose();
                            }}
                        />
                    </View>
                    <View style={styles.containerButtonModal}>
                        <ButtonEntry
                            label='Delete'
                            width={'100%'}
                            borderRadius={10}
                            bg={themeColors.redPrimary}
                            _pressed={{
                                backgroundColor: themeColors.redSecondary,
                            }}
                            _text={{
                                fontWeight: '700',
                            }}
                            onPress={() => {
                                onClose();
                                dispatch(removeItemToCart(item))
                            }}
                        />
                    </View>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
}

export default Quantity2;