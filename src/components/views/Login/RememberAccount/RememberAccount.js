import React, {useState} from 'react';
import {StyleSheet, Switch, Text, View} from "react-native";
import {primaryColor, textRegular} from "../../../../utils/const/style";
import {useFonts} from '@use-expo/font';
import Loading from "../../Loading/Loading";

const styles = StyleSheet.create({
    view: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        color: '#444444'
    }
});

const RememberAccount = ({isEnabled, setIsEnabled}) => {
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    let [fontsLoaded] = useFonts(textRegular);
    if (!fontsLoaded) {
        return <Loading/>;
    }

    return (
        <View style={styles.view}>
            <Text style={styles.text}>Recordar cuenta</Text>
            <Switch
                trackColor={{false: "#767577", true: "#767577"}}
                thumbColor={isEnabled ? primaryColor : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};

export default RememberAccount;