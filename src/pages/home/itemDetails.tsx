import * as React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Product } from '../../types/shop';
import { ThemeContext } from '../../context/theme';
import Quantity from '../../components/quantity/quantity';
import ButtonEntry from '../../components/buttons/buttonSubmit';
import IconBackArrow from '../../assets/icons/backArrow.svg'
import IconStar from '../../assets/icons/star.svg'

const ItemDetails = ({ navigation, route }: any) => {
    const { themeColors } = React.useContext(ThemeContext);
    const { product }: { product: Product } = route.params;
    const [quantity, setQuantity] = React.useState(1);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeColors.background,
        },
        containerImage: {
            height: '100%',
            maxHeight: 436,
            marginBottom: 29,
            backgroundColor: '#F0F0F0',
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
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderWidth: 1,
            borderColor: '#CACACA',
        },
        image: {
            height: '100%'
        },
        titleProduct: {
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 18,
            lineHeight: 19,
            color: themeColors.text,

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
            color: '#000000aa',
            textAlignVertical: 'bottom',
            height: 40,
        },
        textDescription: {
            fontStyle: 'normal',
            fontSize: 16,
            lineHeight: 19,
            textAlign: 'justify',

            color: themeColors.text2,
        },
        textNotStock: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: 20,
            lineHeight: 19,
            textAlign: 'justify',

            color: '#D82F2F'
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

            color: themeColors.text2,
        },
        numberPoints: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: 18,
            lineHeight: 19,
            marginRight: 7,

            color: '#000000aa',
        },
        textCount: {
            fontStyle: 'normal',
            fontSize: 12,
            lineHeight: 19,
            marginRight: 7,

            color: themeColors.text2,
        },
        textPoints: {
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 12,
            lineHeight: 19,

            color: '#000000aa',
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
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, provident hic quos earum iste animi sapiente sit sed odio distinctio sint placeat aliquid, vel, minus ut quibusdam excepturi! Laboriosam, aliquid!
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae perferendis illum maiores eius eligendi magni culpa, quam in impedit inventore beatae, quas, dolores alias labore harum at necessitatibus! Iure, facilis?
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis aliquid vero eum inventore doloremque odit dicta animi eveniet explicabo aspernatur, ratione, ad numquam voluptas corrupti, deleniti recusandae tempore eos laborum.
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere, illo atque. Hic illo nemo voluptates placeat, quaerat quisquam amet consectetur qui laborum maxime autem, quod adipisci optio deleniti aliquid! Dolorem.
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