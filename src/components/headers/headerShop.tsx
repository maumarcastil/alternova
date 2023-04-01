import * as React from 'react';
import { SvgProps } from 'react-native-svg/lib/typescript/ReactNativeSVG';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemeContext } from '../../context/theme';

import Cart from '../../assets/icons/cart2.svg';
import IconBackArrow from '../../assets/icons/backArrow.svg';

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
    iconRight = <Cart width={24} height={24} />,
    showIconLeft = true,
    showIconRight = true,
}: HeaderShopProps
) => {

    const { themeColors } = React.useContext(ThemeContext);

    const styles = StyleSheet.create({
        containerHeader: {
            maxHeight: 38,
            height: '100%',
            marginVertical: 8,
        },
        containerElements: {
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
                            <TouchableOpacity>
                                {iconRight}
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        </>
    );
}

export default HeaderShop;