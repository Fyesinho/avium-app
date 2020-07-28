import React from 'react';
import {useFonts} from "@use-expo/font";
import {textItalic, textRegular} from "../../../../utils/const/style";
import {StyleSheet, Text, View} from "react-native";
import Hr from "../../Hr/Hr";
import Loading from "../../../views/Loading/Loading";

const styles = StyleSheet.create({
    inputView: {
        flex: 0.2,
        justifyContent: 'flex-start',
        paddingBottom: 15,
    },
    labelView: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingBottom: 12
    },
    label: {
        fontFamily: 'Regular-text',
        fontSize: 12,
        textTransform: 'uppercase',
        color: '#888888'
    },
    value: {
        fontFamily: 'Regular-text',
        fontSize: 14,
        textTransform: 'uppercase',
        color: '#444444'
    }
});

const InputDisabled = ({value, label}) => {
    let [fontsLoaded] = useFonts(textRegular);
    if (!fontsLoaded) {
        return <Loading/>;
    }
    return (
        <View style={styles.inputView}>
            <View style={styles.labelView}>
                <Text style={styles.label}>{label}</Text>
            </View>
            <View style={styles.labelView}>
                <Text style={styles.value}>{value}</Text>
            </View>
            <Hr/>
        </View>
    );
};

export default InputDisabled;