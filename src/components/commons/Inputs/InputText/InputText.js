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
        height: 50,
        borderColor: 'black',
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        paddingLeft: 20,
        fontSize: 12
    }
});

const InputText = ({placeholder, ...props}) => {
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
            <TextInput
                {...props}
                style={{...styles.input, fontFamily: 'Regular-text'}}
                placeholder={placeholder}/>
        </View>
    );
};

export default InputText;