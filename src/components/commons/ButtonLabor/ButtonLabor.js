import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome5} from '@expo/vector-icons';
import {primaryColor, textRegular} from "../../../utils/const/style";
import {useFonts} from "@use-expo/font";
import { FontAwesome } from '@expo/vector-icons';
import Loading from "../../views/Loading/Loading";

const styles = StyleSheet.create({
    buttonView: {
        justifyContent: 'center',
        paddingBottom: 25,
        paddingTop: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 20,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#DFDEDE'
    },
    primaryText: {
        color: '#373737',
        fontSize: 12,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    viewSpace: {
        flex: 0.2,
        borderWidth: 1,
        borderColor: 'transparent'
    }
});


const ButtonLabor = ({onPress, children, icon}) => {
    let [fontsLoaded] = useFonts(textRegular);
    if (!fontsLoaded) {
        return <Loading/>;
    }
    return (
        <View style={styles.buttonView}>
            <TouchableOpacity style={{...styles.button, ...styles.primary}} onPress={onPress}>
                <View style={styles.viewSpace}/>
                <Text style={{...styles.primaryText, fontFamily: 'Regular-text'}}>
                    {children}
                </Text>
                <FontAwesome name="plus-circle" size={15} color={primaryColor} />
            </TouchableOpacity>
        </View>
    );
};

export default ButtonLabor;