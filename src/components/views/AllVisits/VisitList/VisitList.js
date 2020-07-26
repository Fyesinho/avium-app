import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFonts} from "@use-expo/font";
import {useNavigation} from '@react-navigation/native';

import ButtonAviumList from "../../../commons/ButtonList/ButtonAviumList";
import {textBold, textRegular} from "../../../../utils/const/style";
import {MaterialIcons} from "@expo/vector-icons";
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
        paddingLeft: 5,
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
        justifyContent: 'flex-end',
    }
});

const iconSync = <MaterialIcons name="sync" size={12} color="green"/>;
const iconNoSync = <MaterialIcons name="sync-disabled" size={12} color="red"/>;

const VisitList = ({visit}) => {
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
    let date = new Date(visit.id).toLocaleDateString("es-CL")
    console.log()
    return (
        <View style={style.container}>
            <View style={style.firstRow}>
                <View>{visit.sync ? iconSync : iconNoSync}</View>
                <View><Text style={style.firstRowText}>{visit.producer && visit.producer.label}</Text></View>
            </View>
            <View style={style.secondRow}>
                <View style={style.date}>
                    <Text style={style.secondRowTitle}>FECHA VISITA:</Text>
                    <Text style={style.secondRowText}>{date}</Text>
                </View>
                <View style={style.buttons}>
                    {!visit.sync &&
                    <View style={{paddingRight: 10}}><ButtonAviumList type={'secondary'}
                                     onPress={() => navigation.navigate('EditVisit', {id: visit.id})}>
                        Editar
                    </ButtonAviumList></View>}
                    <ButtonAviumList
                        onPress={() => navigation.navigate('ShowVisit', {isSyncr: visit.sync, id: visit.id, idRemote: visit.idRemote})}>
                        Ver
                    </ButtonAviumList>
                </View>
            </View>
            <Hr/>
        </View>
    );
};

export default VisitList;