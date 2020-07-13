import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {useFonts} from '@use-expo/font';
import {textRegular} from "../../../../utils/const/style";


const styles = StyleSheet.create({
    inputView: {
        flex: 0.2,
        justifyContent: 'center'
    },
    input: {
        // height: 50,
        borderColor: '#ACACAC',
        borderWidth: 1,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingLeft: 20,
        fontSize: 12
    },
    labelView: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 15
    },
    label: {
        fontFamily: 'Regular-text',
        fontSize: 12,
        textTransform: 'uppercase'
    }
});

const InputTextArea = ({placeholder, label}) => {
    let [fontsLoaded] = useFonts(textRegular);
    if (!fontsLoaded) {
        return <View>
            <Text>
                Cargando...
            </Text>
        </View>;
    }
    return (
        <View style={styles.inputView}>
            <View style={styles.labelView}>
                <Text style={styles.label}>{label}</Text>
            </View>
            <TextInput
                multiline={true}
                numberOfLines={7}
                style={{...styles.input, fontFamily: 'Regular-text'}}
                placeholder={placeholder}/>
        </View>
    );
};

export default InputTextArea;