import * as React from 'react';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Product } from '../../types/shop';
import IconStar from '../../assets/icons/star.svg'
import { ThemeContext } from '../../context/theme';
import Quantity from '../../components/quantity/quantity';
import IconBackArrow from '../../assets/icons/backArrow.svg'
import ButtonEntry from '../../components/buttons/buttonSubmit';

import { addItemTocart } from '../../redux/slices/cart';
import { fetchProductsById } from '../../redux/slices/products';
import { useAppSelector } from '../../hooks/useTypedSelector';

const ItemDetails = ({ navigation, route }: any) => {
    const { product: productRoute }: { product: Product } = route.params;
    const { themeColors } = React.useContext(ThemeContext);

    const [quantity, setQuantity] = React.useState(1);
    const [product, setProduct] = React.useState<Product>(productRoute);

    const dispatch = useDispatch<any>();
    const { selectedProduct } = useAppSelector((state) => state.products);

    React.useEffect(() => {
        dispatch(fetchProductsById(productRoute.id))
    }, []);

    React.useEffect(() => {
        if (selectedProduct?.id === productRoute.id) {
            setProduct(selectedProduct);
        }
    }, [selectedProduct]);

    const handleAddToCart = () => {
        dispatch(addItemTocart({ ...product, quantity, checkForBuy: false }));
        Toast.show({
            type: 'success',
            text1: 'Item added to cart',
            text2: 'Go to cart to complete your order',
        })
    };


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeColors.background,
        },
        containerImage: {
            height: '100%',
            maxHeight: 436,
            marginBottom: 29,
            backgroundColor: themeColors.backgroundImage,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
        },
        containerInfoProduct: {
            marginHorizontal: 21,
        },
        containerPrice: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
        },
        containerIconBack: {
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 1,
        },
        containerAddToCart: {
            borderWidth: 1,
            marginBottom: -1,
            borderColor: themeColors.grayPrimary,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
        },
        image: {
            height: '100%'
        },
        titleProduct: {
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 18,
            lineHeight: 19,
            color: themeColors.textPrimary,

            marginBottom: 10
        },
        titleDescription: {
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 16,
            lineHeight: 19,
            color: themeColors.text,

            marginBottom: 10
        },
        priceProduct: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: 40,
            lineHeight: 19,
            color: themeColors.textGraySecondary,
            textAlignVertical: 'bottom',
            height: 40,
        },
        textDescription: {
            fontStyle: 'normal',
            fontSize: 16,
            lineHeight: 19,
            textAlign: 'justify',

            color: themeColors.textGrayPrimary,
        },
        textNotStock: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: 20,
            lineHeight: 19,
            textAlign: 'justify',

            color: themeColors.textRedPrimary,
        },

        /* points */
        containerPoints: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20
        },
        iconStar: {
            marginRight: 7,
        },
        stockProduct: {
            fontStyle: 'normal',
            fontSize: 12,
            lineHeight: 19,

            color: themeColors.textGrayPrimary,
        },
        numberPoints: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: 18,
            lineHeight: 19,
            marginRight: 7,

            color: themeColors.textGraySecondary,
        },
        textCount: {
            fontStyle: 'normal',
            fontSize: 12,
            lineHeight: 19,
            marginRight: 7,

            color: themeColors.textGrayPrimary,
        },
        textPoints: {
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 12,
            lineHeight: 19,

            color: themeColors.textGraySecondary,
        }
    });

    return (
        <>
            <View style={styles.container} >
                <ScrollView>
                    <View style={styles.containerImage} >
                        <Image
                            resizeMode='center'
                            style={styles.image}
                            source={{ uri: product.image }}
                        />
                        <View style={styles.containerIconBack}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <IconBackArrow />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerInfoProduct}>

                        {/* title and price */}
                        <Text style={styles.titleProduct}>{product.name}</Text>
                        <View style={styles.containerPrice}>
                            <Text style={styles.priceProduct}>${product.unit_price}</Text>
                            <Text style={styles.stockProduct}>Stock: {product.stock}</Text>
                        </View>

                        {/* points */}
                        <View style={styles.containerPoints}>
                            <IconStar style={styles.iconStar} />
                            <Text style={styles.numberPoints}>4.9</Text>
                            <Text style={styles.textCount}>(100)</Text>
                            <Text style={styles.textPoints}>Reviews</Text>

                        </View>
                    </View>

                    <View style={styles.containerInfoProduct}>
                        <Text style={styles.titleDescription}>Description</Text>
                        <View style={styles.containerPrice}>
                            <Text style={styles.textDescription}>
                                {product?.description}
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.containerAddToCart}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: product.stock > 0 ? 'space-between' : 'center',
                        marginHorizontal: 21,
                        marginVertical: 10
                    }}>
                        {product.stock > 0 ?
                            (
                                <>
                                    <Quantity quantity={quantity} setQuantity={setQuantity} />
                                    <ButtonEntry
                                        label='Add to cart'
                                        w={'100%'}
                                        maxW={193}
                                        h={'100%'}
                                        borderRadius={10}
                                        _text={{
                                            fontWeight: '700',
                                        }}
                                        onPress={handleAddToCart}
                                    />
                                </>
                            )
                            :
                            (
                                <View style={{
                                    height: 41,
                                    justifyContent: 'center',
                                }}>
                                    <Text style={styles.textNotStock}>
                                        No stock available :(
                                    </Text>
                                </View>
                            )
                        }

                    </View>
                </View>
            </View>
        </>
    );
}

export default ItemDetails;