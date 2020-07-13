import React, {useState} from 'react';
import {StyleSheet, Text, View, Switch} from "react-native";
import {primaryColor} from "../../../../utils/const/style";
import {useFonts} from '@use-expo/font';
import {textRegular} from "../../../../utils/const/style";

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

const RememberAccount = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    let [fontsLoaded] = useFonts(textRegular);
    if (!fontsLoaded) {
        return <View>
            <Text>
                Cargando...
            </Text>
        </View>;
    }

    return (
        <View style={styles.view}>
            <Text style={styles.text}>Recordar cuenta</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#767577" }}
                thumbColor={isEnabled ? primaryColor : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};

export default RememberAccount;