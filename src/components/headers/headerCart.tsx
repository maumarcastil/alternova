import * as React from 'react';
import { Actionsheet, useDisclose } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { SvgProps } from 'react-native-svg/lib/typescript/ReactNativeSVG';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemeContext } from '../../context/theme';
import { deleteAllItems } from '../../redux/slices/cart';
import { HomeScreenNavigationProp } from '../../types/navigation';

import ButtonEntry from '../buttons/buttonSubmit';
import IconBackArrow from '../../assets/icons/backArrow2.svg';
import { useDispatch } from 'react-redux';

interface HeaderCartProps {
    title: string;
    iconLeft?: React.ReactElement<SvgProps>;
    showIconLeft?: boolean;
}

const HeaderCart = ({
    title,
    iconLeft = <IconBackArrow />,
    showIconLeft = true,
}: HeaderCartProps
) => {

    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclose();
    const { themeColors } = React.useContext(ThemeContext);
    const navigation = useNavigation<HomeScreenNavigationProp>();


    const handleDelete = () => {
        onOpen();
    };


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
        textDelete: {
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 12,
            lineHeight: 15,

            color: '#D82F2F',
        },
        btnDelete: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 6,
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
            <View style={styles.containerHeader}>
                <View style={styles.containerElements}>
                    <View style={[styles.containerIcon, styles.containerIconLeft]}>
                        {showIconLeft &&
                            <TouchableOpacity onPress={() => {
                                navigation.goBack();
                            }}>
                                <IconBackArrow fill={themeColors.textPrimary} />
                            </TouchableOpacity>
                        }
                    </View>
                    <Text style={styles.textHeader}>{title}</Text>
                    <View style={[styles.containerIcon, styles.containerIconRight]}>
                        <TouchableOpacity
                            style={styles.btnDelete}
                            onPress={handleDelete}
                        >
                            <Text style={styles.textDelete} >Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <Actionsheet isOpen={isOpen} onClose={onClose}  >
                <Actionsheet.Content w={'100%'} background={themeColors.backgroundModal} >
                    <Text style={styles.textModal}>
                        Are you sure you want to delete all articles?
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
                                dispatch(deleteAllItems())
                            }}
                        />
                    </View>
                </Actionsheet.Content>
            </Actionsheet>

        </>
    );
}

export default HeaderCart;