import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFonts} from "@use-expo/font";
import { useNavigation } from '@react-navigation/native';

import ButtonAviumList from "../../../commons/ButtonList/ButtonAviumList";
import {secondaryColor, textBold, textRegular} from "../../../../utils/const/style";
import {AntDesign} from "@expo/vector-icons";
import Hr from "../../../commons/Hr/Hr";

const style = StyleSheet.create({
    container: {
        paddingTop: 5
    },
    firstRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    firstRowText: {
        fontFamily: 'Regular-text',
        fontSize: 16,
        color: '#444444',
        paddingLeft: 5
    },
    secondRowTitle: {
        fontFamily: 'Regular-text',
        fontSize: 12,
        color: '#888888'
    },
    secondRowText: {
        fontFamily: 'Bold-text',
        fontSize: 12,
        color: '#444444'
    },
    secondRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 10,
    },
    date: {
        flex: 0.6,
        flexDirection: 'row',
    },
    buttons: {
        flex: 0.4,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

const iconSync = <AntDesign name="sync" size={12} color={'green'} />;

const VisitList = () => {
    let [fontsLoaded] = useFonts(textRegular);
    let [fontsLoaded2] = useFonts(textBold);
    const navigation = useNavigation();
    if (!fontsLoaded || !fontsLoaded2) {
        return <View>
            <Text>
                Cargando...
            </Text>
        </View>;
    }
    return (
        <View style={style.container}>
            <View style={style.firstRow}>
                <View>{iconSync}</View>
                <View><Text style={style.firstRowText}>Productor 2</Text></View>
            </View>
            <View style={style.secondRow}>
                <View style={style.date}>
                    <Text style={style.secondRowTitle}>FECHA VISITA:</Text>
                    <Text style={style.secondRowText}>30/06/2020</Text>
                </View>
                <View style={style.buttons}>
                    <ButtonAviumList type={'secondary'} onPress={() => navigation.navigate('EditVisit')}>
                        Editar
                    </ButtonAviumList>
                    <ButtonAviumList onPress={() => navigation.navigate('ShowVisit', {isSyncr: false})} >
                        Ver
                    </ButtonAviumList>
                </View>
            </View>
            <Hr/>
        </View>
    );
};

export default VisitList;