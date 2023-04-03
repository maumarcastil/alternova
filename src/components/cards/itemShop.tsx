import * as React from 'react';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Product } from '../../types/shop';
import { pagesNames } from '../../types/pages';
import IconBag from '../../assets/icons/bag.svg';
import { ThemeContext } from '../../context/theme';
import { addItemTocart } from '../../redux/slices/cart';
import { HomeScreenNavigationProp } from '../../types/navigation';


const ItemShop = ({ item }: {
    item: Product;
}) => {
    const { themeColors } = React.useContext(ThemeContext);
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const dispatch = useDispatch()

    const handlePressBag = () => {
        if (item.stock > 0) {
            dispatch(addItemTocart({
                ...item,
                quantity: 1,
                checkForBuy: false
            }))

            Toast.show({
                type: 'success',
                text1: 'Item added to cart',
                text2: 'Go to cart to complete your order',
                position: 'bottom',
            })
        } else {
            Toast.show({
                type: 'error',
                text1: 'Item out of stock',
                text2: 'Please try again later',
                position: 'bottom',
            })
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            minWidth: '45%',
            maxWidth: '49%',
            height: 258,

            // my visual styles; not important for grid
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
        containerImage: {
            height: 180,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: themeColors.backgroundImage,
        },
        containerText: {
            borderRadius: 10,
            marginVertical: 14,
            marginHorizontal: 16,
        },
        containerPrice: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        containerIconBag: {
            width: 25,
            height: 25,
            borderRadius: 100,
            backgroundColor: '#F2F2F2',
            justifyContent: 'center',
            alignItems: 'center',
        },
        textPrice: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: 12,
            lineHeight: 15,
            color: themeColors.textPrimary,
        },
        textTitleItem: {
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 12,
            lineHeight: 15,
            color: themeColors.textSecondary,
            marginBottom: 13
        },
        images: {
            width: '100%',
            height: '100%',
        }
    });

    return (
        <>
            <TouchableOpacity style={styles.container} onPress={() => {
                navigation.navigate(pagesNames.ITEM_DETAILS, { product: item });
            }}>
                <View style={styles.containerImage}>
                    <Image
                        style={styles.images}
                        source={{ uri: item.image }}
                        resizeMode='contain'
                    />
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.textTitleItem}>{item.name}</Text>
                    <View style={styles.containerPrice}>
                        <Text style={styles.textPrice} >$ {item.unit_price}</Text>
                        <TouchableOpacity onPress={handlePressBag} >
                            <View style={styles.containerIconBag} >
                                <IconBag />
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
}

export default ItemShop;