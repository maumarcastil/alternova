import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { ThemeContext } from '../../context/theme';
import HeaderShop from '../../components/headers/headerShop';
import productJson from '../../mock/products.json'
import ItemShop from '../../components/cards/itemShop';
import { Product } from '../../types/shop';

const ShopPage = () => {
    const { themeColors } = React.useContext(ThemeContext);
    const [data, setData] = React.useState<Array<Product[]>>([]);

    React.useEffect(() => {
        const pares = productJson.products.reduce((result: any[], element: Product, index) => {
            if (index % 2 === 0 && index !== productJson.products.length - 1) {
                result.push([element, productJson.products[index + 1]]);
            } else if (index === productJson.products.length - 1) {
                result.push([element]);
            }
            return result;
        }, []);
        setData(pares);
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeColors.background,
        },
        containerTitle: {
            marginBottom: 26,
            marginHorizontal: 16,
        },
        textTitle: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: 16,
            lineHeight: 19,
            color: themeColors.text,
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