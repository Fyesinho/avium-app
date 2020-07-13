import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Hr from "../../../commons/Hr/Hr";
import {useFonts} from "@use-expo/font";
import {titleFont} from "../../../../utils/const/style";

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
    },
    text: {
        textTransform: 'uppercase',
        fontFamily: 'Title',
        fontSize: 25,
        color: '#444444',
        paddingLeft: 15
    }
})


const MenuItem = ({icon, title, to, hr}) => {
    const handlerTo = to => {

    }

    let [fontsLoaded] = useFonts(titleFont);
    if (!fontsLoaded) {
        return <View>
            <Text>
                Cargando...
            </Text>
        </View>;
    }

    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.2}}/>
            <View style={{flex: 0.8}}>
                <TouchableOpacity style={style.container} onPress={handlerTo(to)}>
                    {icon}
                    <Text style={style.text}>
                        {title}
                    </Text>
                </TouchableOpacity>
                {
                    hr && <Hr/>
                }
            </View>
        </View>
    );
};

export default MenuItem;