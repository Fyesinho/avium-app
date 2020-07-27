import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {ImageBackground} from "react-native";

const image = require('../../../../assets/images/header-large.png')
const logo = require('../../../../assets/images/logo-main.png')

const styles = StyleSheet.create({
    headerLogin: {
        flex: 0.15,
        width: '100%',
        backgroundColor: 'red',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
});


const HeaderShortMenu = () => {
    return (
        <View style={styles.headerLogin}>
            <ImageBackground source={image} style={styles.image}>
                <Image source={logo} style={styles.logo}/>
            </ImageBackground>
        </View>
    );
};

export default HeaderShortMenu;