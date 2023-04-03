import * as React from 'react';
import { Checkbox } from 'native-base';
import { Image, StyleSheet, Text, View } from 'react-native';

import Quantity2 from '../quantity/quantity2';
import { ProductWithQuantity, updateCheckForBuy } from '../../redux/slices/cart';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../../context/theme';
import { color } from 'native-base/lib/typescript/theme/styled-system';

interface ItemCardProps {
    item: ProductWithQuantity;
}

const ItemCard = ({ item }: ItemCardProps) => {
    const dispatch = useDispatch()
    const { themeColors } = React.useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            borderRadius: 10,
            backgroundColor: themeColors.backgroundCard,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.18,
            shadowRadius: 4.59,
            elevation: 5
        },
        containerItems: {
            marginVertical: 10,
            marginHorizontal: 16,
            flexDirection: 'row',
        },
        containerImage: {
            width: 80,
            height: 80,
            borderRadius: 5,
            marginRight: 21,
            backgroundColor: themeColors.backgroundImage,
        },
        containerInfo: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        containerText: {
            width: '100%',
            maxWidth: 132,
        },
        containerQuantity: {
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'space-between',

            /* backgroundColor: 'red', */
        },
        image: {
            width: '100%',
            height: '100%',
        },
        textTitleItem: {
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 14,
            lineHeight: 15,
            marginBottom: 6,
            color: themeColors.textBlackAndWhite
        },
        textPrice: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: 16,
            lineHeight: 15,
            color: themeColors.textBlackAndWhite
        },
    });
    return (
        <>
            <View style={styles.container}>
                <View style={styles.containerItems}>
                    <View style={styles.containerImage}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: item.image }}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={styles.containerInfo}>
                        <View style={styles.containerText}>
                            <Text style={styles.textTitleItem} >{item.name}</Text>
                            <Text style={styles.textPrice} >${item.unit_price}</Text>
                        </View>

                        <View style={styles.containerQuantity}>
                            <Checkbox
                                rounded={'full'}
                                value={`${item.id}`}
                                colorScheme={'green'}
                                defaultIsChecked={item.checkForBuy}
                                onChange={(value) => {
                                    dispatch(updateCheckForBuy({
                                        ...item,
                                        checkForBuy: value
                                    }))
                                }}
                                accessibilityLabel="Check for buy"
                            />
                            <Quantity2
                                item={item}
                                quantity={item.quantity}
                            />
                        </View>
                    </View>
                </View>

            </View>
        </>
    );
}

export default ItemCard;