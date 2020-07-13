import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {primaryColor, secondaryColor, titleFontBond} from "../../../utils/const/style";
import {useFonts} from "@use-expo/font";

const styles = StyleSheet.create({
    buttonView: {
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 25,
        width: 50,
        flexDirection: 'row',
    },
    primary: {
        backgroundColor: primaryColor,
        borderRadius: 5
    },
    primaryText: {
        color: secondaryColor,
        fontSize: 12,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    secondary: {
        backgroundColor: secondaryColor,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: primaryColor
    },
    secondaryText: {
        color: primaryColor,
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


const ButtonAviumList = ({onPress, children, icon, type}) => {
    let [fontsLoaded] = useFonts(titleFontBond);
    if (!fontsLoaded) {
        return <View>
            <Text>
                Cargando...
            </Text>
        </View>;
    }
    let typeStyleText = type === 'secondary' ? styles.secondaryText : styles.primaryText;
    let typeStyleButton = type === 'secondary' ? styles.secondary : styles.primary;
    return (
        <View style={styles.buttonView}>
            <TouchableOpacity style={{...styles.button, ...typeStyleButton}} onPress={onPress}>
                <View style={styles.viewSpace}/>
                <Text style={{...typeStyleText, fontFamily: 'Title-bold'}}>
                    {children}
                </Text>
                {icon ? icon : <View style={styles.viewSpace}/>}
            </TouchableOpacity>
        </View>
    );
};

export default ButtonAviumList;