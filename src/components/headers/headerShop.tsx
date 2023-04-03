import * as React from 'react';
import { SvgProps } from 'react-native-svg/lib/typescript/ReactNativeSVG';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemeContext } from '../../context/theme';

import Cart from '../../assets/icons/cart2.svg';
import IconBackArrow from '../../assets/icons/backArrow.svg';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { HomeScreenNavigationProp } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { pagesNames } from '../../types/pages';

interface HeaderShopProps {
    title: string;
    iconLeft?: React.ReactElement<SvgProps>;
    iconRight?: React.ReactElement<SvgProps>;
    showIconLeft?: boolean;
    showIconRight?: boolean;
}

const HeaderShop = ({
    title,
    iconLeft = <IconBackArrow />,
    iconRight = <Cart width={24} height={24} fill={'black'} />,
    showIconLeft = true,
    showIconRight = true,
}: HeaderShopProps
) => {
    const { themeColors } = React.useContext(ThemeContext);
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const { items } = useAppSelector(state => state.cart)
    const countNumItems = items.reduce((acumulador, item) => acumulador + item.quantity, 0);

    const styles = StyleSheet.create({
        containerHeader: {
            maxHeight: 48,
            height: '100%',
            justifyContent: 'center',
            backgroundColor: themeColors.background,

        },
        containerElements: {
            marginVertical: 10,
            marginHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        textHeader: {
            fontStyle: 'normal',
            fontWeight: '800',
            fontSize: 15,
            lineHeight: 18,
            color: themeColors.text,
        },
        containerIcon: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        containerIconLeft: {
            justifyContent: 'flex-start',
        },
        containerIconRight: {
            justifyContent: 'flex-end',
        },
    });

    return (
        <>
            <View style={styles.containerHeader}>
                <View style={styles.containerElements}>
                    <View style={[styles.containerIcon, styles.containerIconLeft]}>
                        {showIconLeft &&
                            <TouchableOpacity>
                                {iconLeft}
                            </TouchableOpacity>
                        }
                    </View>
                    <Text style={styles.textHeader}>{title}</Text>
                    <View style={[styles.containerIcon, styles.containerIconRight]}>
                        {showIconRight &&
                            <View style={{
                                borderRadius: 100,
                                height: 40,
                                width: 40,
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => {
                                        navigation.navigate(pagesNames.CART);
                                    }}
                                >
                                    <Cart width={24} height={24} fill={themeColors.textPrimary} />

                                    {countNumItems > 0 &&
                                        <Text style={{
                                            marginLeft: 8,
                                            fontWeight: '700',
                                            fontSize: 14,
                                            color: themeColors.textPrimary
                                        }} >{
                                                countNumItems > 0 && countNumItems < 10 ? countNumItems : `+9`
                                            }</Text>
                                    }
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </View>
            </View>
        </>
    );
}

export default HeaderShop;