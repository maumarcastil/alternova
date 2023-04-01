import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { pagesNames } from "./pages";
import { Product } from "./shop";
import { RouteProp } from "@react-navigation/native";

export type AuthStackParamList = {
    [pagesNames.SIGNIN]: undefined;
    [pagesNames.SIGNUP]: undefined;
}

export type HomeStackParamList = {
    [pagesNames.SHOP]: undefined;
    [pagesNames.ITEM_DETAILS]: {
        product: Product;
    };
    [pagesNames.PROFILE]: undefined;
    [pagesNames.CART]: undefined;
    [pagesNames.CHECKOUT]: undefined;
}

export type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, pagesNames.SIGNUP>
export type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, pagesNames.SHOP>
