import * as React from 'react';
import { Divider } from 'native-base';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import { ThemeContext } from '../../context/theme';
import { formatNumberUsd } from '../../utils/formatNumber';
import { ProductWithQuantity } from '../../redux/slices/cart';
import { useAppSelector } from '../../hooks/useTypedSelector';

import ItemCard from '../../components/cards/itemCard';
import HeaderCart from '../../components/headers/headerCart';
import ButtonEntry from '../../components/buttons/buttonSubmit';
import { useDispatch } from 'react-redux';
import { buyItems } from '../../redux/slices/cart';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { HomeScreenNavigationProp } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { pagesNames } from '../../types/pages';


const CartPage = () => {
    const { themeColors } = React.useContext(ThemeContext);
    const { items } = useAppSelector(state => state.cart)
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const sumPriceTotal = (items: ProductWithQuantity[]) => {
        let sum = 0;
        items.forEach(item => {
            if (item.checkForBuy) {
                sum += item.unit_price * item.quantity
            }
        })
        return sum
    }

    const handleCheckout = async () => {
        try {
            setLoading(true)
            const itemsForBuy = items.filter(item => item.checkForBuy)
            const obj = {
                items: itemsForBuy,
                total: sumPriceTotal(itemsForBuy)
            }
            await dispatch(buyItems(obj))
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Your order has been placed',
            })
            navigation.navigate(pagesNames.SHOP)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong',
            })
        } finally {
            setLoading(false)
        }
    }



    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeColors.background,
        },
        containerRowItems: {
            flex: 1,
            marginVertical: 4,
            marginHorizontal: 16,
            justifyContent: 'space-between',
        },
        containerAddToCart: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderWidth: 1,
            marginBottom: -1,
            borderColor: themeColors.grayPrimary,
        },
        containerTotalPrice: {
            marginTop: 20
        },
        containerText: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,

            marginHorizontal: 16,
        },
        textLight: {
            fontSize: 16,
            fontWeight: '400',
            lineHeight: 19,
            color: themeColors.textGrayPrimary
        },
        textDark: {
            fontSize: 16,
            fontWeight: '500',
            lineHeight: 19,

            color: themeColors.textBlackAndWhite
        },
        textDarkTotal: {
            fontSize: 16,
            fontWeight: '700',
            lineHeight: 19,
            color: themeColors.textBlackAndWhite
        },

    });

    return (
        <>
            <View style={styles.container} >
                <HeaderCart title={'Cart'} />
                <FlatList
                    data={items}
                    renderItem={({ item }) => (
                        <View style={styles.containerRowItems}>
                            <ItemCard item={item} />
                        </View>
                    )}
                    ListEmptyComponent={
                        <View style={[styles.containerRowItems]}>
                            <Text style={styles.textLight} >Your cart is empty</Text>
                        </View>
                    }
                    ListFooterComponent={
                        <View style={styles.containerTotalPrice}>
                            <View style={styles.containerText}>
                                <Text style={styles.textLight} >Sub-total</Text>
                                <Text style={styles.textDark} >{formatNumberUsd(sumPriceTotal(items))}</Text>
                            </View>
                            <View style={styles.containerText}>
                                <Text style={styles.textLight} >Voucher</Text>
                                <Text style={styles.textDark} >$ 0</Text>
                            </View>
                            <View style={styles.containerText}>
                                <Text style={styles.textLight} >Delivery Fee</Text>
                                <Text style={styles.textDark} >$ 0</Text>
                            </View>
                            <View style={styles.containerText}>
                                <Divider bg={'#CACACA'} />
                            </View>
                            <View style={styles.containerText}>
                                <Text style={styles.textDarkTotal} >Total</Text>
                                <Text style={styles.textDarkTotal} >{formatNumberUsd(sumPriceTotal(items))}</Text>
                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />

                <View style={styles.containerAddToCart}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginHorizontal: 21,
                        marginVertical: 10
                    }}>
                        <ButtonEntry
                            w={'100%'}
                            h={'100%'}
                            borderRadius={10}
                            _text={{
                                fontWeight: '700',
                            }}
                            isLoading={loading}
                            onPress={handleCheckout}
                            isDisabled={sumPriceTotal(items) === 0}
                            label={`Checkout ${formatNumberUsd(sumPriceTotal(items))}`}
                        />
                    </View>
                </View>

            </View>
        </>
    );
}

export default CartPage;