import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import HeaderLarge from "../../commons/Headers/HeaderLarge/HeaderLarge";
import Title from "../../commons/Title/Title";
import {AntDesign, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import ButtonAvium from "../../commons/Button/ButtonAvium";
import {primaryColor, textBold, textRegular} from "../../../utils/const/style";
import {useFonts} from "@use-expo/font";
import Loading from "../Loading/Loading";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    bodyLogin: {
        flex: 0.65,
        width: '100%',
        paddingLeft: 40,
        paddingRight: 40,
        alignItems: 'center',
    },
    logo: {
        flex: 0.25,
        justifyContent: 'center'
    },
    title: {
        flex: 0.1
    },
    viewText: {
        flex: 0.12,
        width: '100%',
        alignItems: 'center'
    },
    viewButtons: {
        paddingTop: 10,
        flex: 0.43,
        width: '100%',
        justifyContent: 'space-between'
    },
    text: {
        fontFamily: 'Regular-text',
        fontSize: 14
    }
});

const iconAdd = <MaterialCommunityIcons name="file-document-box-plus" size={20} color="white"/>;
const iconSearch = <MaterialCommunityIcons name="file-document-box-search" size={20} color="white"/>;
const iconEye = <AntDesign name="eye" size={20} color={primaryColor}/>;

const SyncVisit = ({navigation, route}) => {
    const visit = route.params && route.params.visit;
    const idRemote = route.params && route.params.idRemote;

    let [fontsLoaded] = useFonts(textRegular);
    let [fontsLoaded2] = useFonts(textBold);
    if (!fontsLoaded || !fontsLoaded2) {
        return <Loading/>;
    }
    return (
        <View style={styles.container}>
            <HeaderLarge/>
            <View style={styles.bodyLogin}>
                <View style={styles.logo}>
                    <FontAwesome5 name="check-circle" size={80} color={'#FF4A4A'}/>
                </View>
                <Title flex={styles.title}>
                    VISITA SINCRONIZADA
                </Title>
                <View style={styles.viewText}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.text}>
                            Visita
                        </Text>
                        <Text style={{fontFamily: 'Bold-text', fontSize: 14, paddingLeft: 2}}>
                            {visit.producer.label}
                        </Text>
                    </View>
                    <Text style={styles.text}>
                        Se ha sincronizado correctamente
                    </Text>
                </View>
                <View style={styles.viewButtons}>
                    <ButtonAvium type={'secondary'} icon={iconEye} onPress={() => navigation.push('ShowVisit', {isSyncr: true, idRemote: idRemote[0].id})}>
                        ver visita sincronizada
                    </ButtonAvium>
                    <ButtonAvium icon={iconAdd} onPress={() => navigation.push('AddVisit')}>
                        ingresar otra visita
                    </ButtonAvium>
                    <ButtonAvium icon={iconSearch} onPress={() => navigation.push('AllVisits')}>
                        Ver todas mis visitas
                    </ButtonAvium>
                </View>
            </View>
        </View>
    );
}

export default SyncVisit;