import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Product } from '../../types/shop';
import productJson from '../../mock/products.json';
import { ThemeContext } from '../../context/theme';
import ItemShop from '../../components/cards/itemShop';
import HeaderShop from '../../components/headers/headerShop';
import { RootState } from '../../redux/store';

import { fetchProducts } from '../../redux/slices/products';

const ShopPage = () => {
    const dispatch = useDispatch<any>();
    const { themeColors } = React.useContext(ThemeContext);
    const [data, setData] = React.useState<Array<Product[]>>([]);
    const { products } = useSelector((state: RootState) => state.products);

    React.useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    React.useEffect(() => {
        const pares = products?.reduce((result: any[], element: Product, index) => {
            if (index % 2 === 0 && index !== products?.length - 1) {
                result.push([element, products[index + 1]]);
            } else if (index === products?.length - 1) {
                result.push([element]);
            }
            return result;
        }, []);
        setData(pares);
    }, [products]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeColors.background,
        },
        containerTitle: {
            marginTop: 16,
            marginBottom: 26,
            marginHorizontal: 16,
        },
        textTitle: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: 16,
            lineHeight: 19,
            color: themeColors.textPrimary,
        },
        containerRowItems: {
            flex: 1,
            marginBottom: 8,
            flexDirection: 'row',
            marginHorizontal: 16,
            justifyContent: 'space-between',
        },
    });

    return (
        <>
            <View style={styles.container} >
                <HeaderShop title={'Home'} showIconLeft={false} />
                <FlatList
                    ListHeaderComponent={
                        <View style={styles.containerTitle}>
                            <Text style={styles.textTitle}>Recommended</Text>
                        </View>
                    }
                    data={data}
                    renderItem={({ item, index }) => (
                        <View style={styles.containerRowItems}>
                            <ItemShop item={item[0]} />
                            {item[1] && <ItemShop item={item[1]} />}
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </>
    );
}

export default ShopPage;