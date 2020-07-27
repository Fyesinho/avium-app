import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFonts} from "@use-expo/font";
import {primaryColor, titleFontBond} from "../../../utils/const/style";
import VisitList from "../../views/AllVisits/VisitList/VisitList";
import Loading from "../../views/Loading/Loading";

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
        borderColor: '#888888',
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
    buttonFirstSelected: {
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        borderWidth: 1,
        borderColor: primaryColor,
        paddingTop: 5,
        paddingBottom: 5,
        flex: 0.33,
        alignItems: 'center'
    },
    buttonMiddleSelect: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: primaryColor,
        paddingTop: 5,
        paddingBottom: 5,
        flex: 0.33,
        alignItems: 'center'
    },
    buttonLastSelected: {
        borderWidth: 1,
        borderColor: primaryColor,
        paddingTop: 5,
        paddingBottom: 5,
        flex: 0.33,
        alignItems: 'center',
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
    },
})

const Filter = ({noSyncList, syncList}) => {
    let [fontsLoaded] = useFonts(titleFontBond);
    const [filterSelected, setFilterSelected] = useState(0);
    if (!fontsLoaded) {
        return <Loading/>;
    }

    let totalList;
    switch (filterSelected) {
        case 0: {
            totalList = [...noSyncList, ...syncList];
            break;
        }
        case 1: {
            totalList = [...syncList];
            break;
        }
        case 2: {
            totalList = [...noSyncList];
            break;
        }
    }
    totalList.sort((a, b) => (a.id < b.id) ? 1 : -1);

    return (
        <View>
            <View style={style.container}>
                <TouchableOpacity style={filterSelected === 0 ? style.buttonFirstSelected : style.buttonFirst}
                                  onPress={() => setFilterSelected(0)}>
                    <Text style={filterSelected === 0 ? style.textSelected : style.text}>todas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={filterSelected === 1 ? style.buttonMiddleSelect : style.buttonMiddle}
                                  onPress={() => setFilterSelected(1)}>
                    <Text style={filterSelected === 1 ? style.textSelected : style.text}>sincronizadas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={filterSelected === 2 ? style.buttonLastSelected : style.buttonLast}
                                  onPress={() => setFilterSelected(2)}>
                    <Text style={filterSelected === 2 ? style.textSelected : style.text}>no sincronizadas</Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop: 15}}>
                {
                    totalList && totalList.map((visit, index) => {
                        return <VisitList key={index} visit={visit}/>
                    })
                }
            </View>
        </View>
    );
};

export default Filter;