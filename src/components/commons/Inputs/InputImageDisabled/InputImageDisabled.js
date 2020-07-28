import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {useFonts} from "@use-expo/font";
import {textRegular} from "../../../../utils/const/style";
import Loading from "../../../views/Loading/Loading";

const styles = StyleSheet.create({
    tinyLogo: {
        width: '100%',
        height: 130,
        borderWidth: 1,
        borderRadius: 5,
    },
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
    }
});


const InputImageDisabled = ({uri, label}) => {
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
                <Image
                    style={styles.tinyLogo}
                    source={{uri}}
                />
            </View>
        </View>

    );
};

export default InputImageDisabled;