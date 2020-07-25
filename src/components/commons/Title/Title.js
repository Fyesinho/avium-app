import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {useFonts} from '@use-expo/font';
import {titleFont} from "../../../utils/const/style";
import Loading from "../../views/Loading/Loading";

const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fe5b5b',
        fontSize: 25
    }
});

const Title = ({children, flex}) => {
    let [fontsLoaded] = useFonts(titleFont);
    if (!fontsLoaded) {
        return <Loading/>;
    }
    return (
        <View style={{...flex, ...styles.title}}>
            <Text style={{...styles.text, fontFamily: 'Title'}}>{children}</Text>
        </View>
    );
};

export default Title;