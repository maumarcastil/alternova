import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { pagesNames } from "./pages";

export type AuthStackParamList = {
    [pagesNames.SIGNIN]: undefined;
    [pagesNames.SIGNUP]: undefined;
}

export type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, pagesNames.SIGNUP>
