import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {disabledColor, primaryColor, secondaryColor, titleFontBond} from "../../../utils/const/style";
import {useFonts} from "@use-expo/font";
import Loading from "../../views/Loading/Loading";

const styles = StyleSheet.create({
    buttonView: {
        justifyContent: 'center',
        flex: 0.2
    },
    button: {
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 50,
        flexDirection: 'row',
    },
    primary: {
        backgroundColor: primaryColor,
        borderRadius: 5
    },
    primaryText: {
        color: secondaryColor,
        fontSize: 25,
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
        fontSize: 25,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    disabled: {
        backgroundColor: secondaryColor,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: disabledColor
    },
    disabledText: {
        color: disabledColor,
        fontSize: 25,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    viewSpace: {
        flex: 0.2,
        borderWidth: 1,
        borderColor: 'transparent'
    }
});


const ButtonAvium = ({onPress, children, icon, type, disabled}) => {
    let [fontsLoaded] = useFonts(titleFontBond);
    if (!fontsLoaded) {
        return <Loading/>;
    }
    let typeStyleText;
    let typeStyleButton;
    switch (type) {
        case 'disabled': {
            typeStyleText = styles.disabledText;
            typeStyleButton = styles.disabled;
            break;
        }
        case 'secondary': {
            typeStyleText = styles.secondaryText;
            typeStyleButton = styles.secondary;
            break;
        }
        default: {
            typeStyleText = styles.primaryText;
            typeStyleButton = styles.primary;
            break;
        }
    }
    return (
        <View style={styles.buttonView}>
            <TouchableOpacity style={{...styles.button, ...typeStyleButton}} onPress={onPress} disabled={disabled}>
                <View style={styles.viewSpace}/>
                <Text style={{...typeStyleText, fontFamily: 'Title-bold'}}>
                    {children}
                </Text>
                {icon ? icon : <View style={styles.viewSpace}/>}
            </TouchableOpacity>
        </View>
    );
};

export default ButtonAvium;