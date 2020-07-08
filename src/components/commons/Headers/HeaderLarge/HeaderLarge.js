import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
    headerLogin: {
        flex: 0.3,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    logo: {
        paddingTop: 20
    }
});


const HeaderLarge = () => {
    return (
        <View style={styles.headerLogin}>
            <Text style={styles.logo}>
                Hola cocosa
            </Text>
        </View>
    );
};

export default HeaderLarge;