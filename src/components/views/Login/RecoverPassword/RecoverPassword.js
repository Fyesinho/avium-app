import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {textRegular, textLight} from "../../../../utils/const/style";
import {useFonts} from "@use-expo/font";
// import {Link} from "react-router-native";

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
    let [fontsLoaded] = useFonts(textRegular);
    let [fontsLoaded2] = useFonts(textLight);
    if (!fontsLoaded || !fontsLoaded2) {
        return <View>
            <Text>
                Cargando...
            </Text>
        </View>;
    }
    return (
        <View style={styles.view}>
            <Text style={{...styles.text, fontFamily: 'Light-text'}}>¿Olvidaste la contraseña?</Text>
            {/*<Link to={'/recover-password'}>*/}
                <Text style={{...styles.link, fontFamily: 'Regular-text' }}>
                    Recuperala aquí
                </Text>
            {/*</Link>*/}
        </View>
    );
};

export default RecoverPassword;