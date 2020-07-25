import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {textLight, textRegular} from "../../../../utils/const/style";
import {useFonts} from "@use-expo/font";
import Loading from "../../Loading/Loading";
import * as Linking from 'expo-linking';


const styles = StyleSheet.create({
    view: {
        flex: 0.1,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    text: {
        color: '#999999',
        paddingRight: 10,
        fontSize: 12
    },
    link: {
        textDecorationLine: 'underline',
        fontSize: 12,
        marginTop: 1
    }
});


const RecoverPassword = () => {
    const handlerOnPres = () => {
        Linking.openURL('http://avium.agromarketing.cl/admin/password/reset');
    }

    let [fontsLoaded] = useFonts(textRegular);
    let [fontsLoaded2] = useFonts(textLight);
    if (!fontsLoaded || !fontsLoaded2) {
        return <Loading/>;
    }
    return (
        <View style={styles.view}>
            <Text style={{...styles.text, fontFamily: 'Light-text'}}>¿Olvidaste la contraseña?</Text>
            <Text style={{...styles.link, fontFamily: 'Regular-text'}} onPress={() => handlerOnPres()}>
                Recuperala aquí
            </Text>
        </View>
    );
};

export default RecoverPassword;