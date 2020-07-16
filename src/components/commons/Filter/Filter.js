import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFonts} from "@use-expo/font";
import {primaryColor, titleFontBond} from "../../../utils/const/style";
import VisitList from "../../views/AllVisits/VisitList/VisitList";

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },
    text: {
        textTransform: 'uppercase',
        fontSize: 14,
        fontFamily: 'Title-bold',
        color: '#888888'
    },
    textSelected: {
        textTransform: 'uppercase',
        fontSize: 14,
        color: primaryColor,
        fontFamily: 'Title-bold'
    },
    buttonFirst: {
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        borderWidth: 1,
        borderColor: primaryColor,
        paddingTop: 5,
        paddingBottom: 5,
        flex: 0.33,
        alignItems: 'center'
    },
    buttonMiddle: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#888888',
        paddingTop: 5,
        paddingBottom: 5,
        flex: 0.33,
        alignItems: 'center'
    },
    buttonLast: {
        borderWidth: 1,
        borderColor: '#888888',
        paddingTop: 5,
        paddingBottom: 5,
        flex: 0.33,
        alignItems: 'center',
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
    },
})

const Filter = () => {
    let [fontsLoaded] = useFonts(titleFontBond);
    if (!fontsLoaded) {
        return <View>
            <Text>
                Cargando...
            </Text>
        </View>;
    }
    return (
        <View>
            <View style={style.container}>
                <TouchableOpacity style={style.buttonFirst}>
                    <Text style={style.textSelected}>todas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.buttonMiddle}>
                    <Text style={style.text}>sincronizadas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.buttonLast}>
                    <Text style={style.text}>no sincronizadas</Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop: 15}}>
                <VisitList/>
                <VisitList/>
                <VisitList/>
                <VisitList/>
            </View>
        </View>
    );
};

export default Filter;