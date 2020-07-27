import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {AntDesign, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import Title from "../../commons/Title/Title";
import MenuItem from "./MenuItem/MenuItem";
import {primaryColor, textBold, textRegular} from "../../../utils/const/style";
import {useFonts} from "@use-expo/font";
import HeaderShortMenu from "../../commons/Headers/HeaderShortMenu/HeaderShortMenu";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column'
    },
    body: {
        flex: 0.85,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 40,
        paddingTop: 15,
        paddingBottom: 15,
    },
    title: {
        // flex: 0.1
    },
    form: {
        paddingTop: 15
    },
    tinyLogo: {
        width: 50,
        height: 50,
        borderRadius: 5,
        borderColor: 'lightgray',
    },
    space: {
        flex: 0.7
    },
    textName: {
        fontFamily: 'Bold-text',
        fontSize: 16,
        color: '#444444'
    },
    textJob: {
        fontFamily: 'Regular-text',
        fontSize: 16,
        color: '#A9A9A9'
    }

});

const iconClose = <AntDesign name="close" size={24} color={primaryColor}/>;
const iconHome = <FontAwesome name="home" size={24} color={primaryColor}/>;
const iconAdd = <MaterialCommunityIcons name="file-document-box-plus" size={24} color={primaryColor}/>;
const iconSearch = <MaterialCommunityIcons name="file-document-box-search" size={24} color={primaryColor}/>;
const iconLogout = <MaterialCommunityIcons name="logout" size={24} color={primaryColor}/>;

const Menu = ({setModalVisible}) => {

    let [fontsLoaded] = useFonts(textRegular);
    let [fontsLoaded2] = useFonts(textBold);
    if (!fontsLoaded || !fontsLoaded2) {
        return <View>
            <Text>
                Cargando...
            </Text>
        </View>;
    }

    return (
        <View style={styles.container}>
            <HeaderShortMenu/>
            <View style={styles.body}>
                <TouchableOpacity style={{flex: 0.1, alignItems: 'flex-end'}} onPress={() => setModalVisible(false)}>
                    {iconClose}
                </TouchableOpacity>
                <Title flex={styles.title}>
                    menu
                </Title>
                <View style={styles.space}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 0.3}}>
                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}
                        />
                        <View style={{flexDirection: 'column', paddingLeft: 15}}>
                            <Text style={styles.textName}>
                                Rodrigo Gonzalez
                            </Text>
                            <Text style={styles.textJob}>
                                Supervisor
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 0.6, justifyContent: 'space-around', paddingTop: 15}}>
                        <MenuItem icon={iconHome} title={'Home'} to={'Home'} hr={true} setModalVisible={setModalVisible}/>
                        <MenuItem icon={iconAdd} title={'INGRESAR nueva visita'} to={'AddVisit'} hr={true} setModalVisible={setModalVisible}/>
                        <MenuItem icon={iconSearch} title={'ver mis visitas'} to={'AllVisits'} hr={true} setModalVisible={setModalVisible}/>
                    </View>
                </View>
                <View style={{flex: 0.1}}>
                    <MenuItem icon={iconLogout} title={'Cerrar sesión'} to={'Login'} setModalVisible={setModalVisible}/>
                </View>
            </View>
        </View>
    );
};

export default Menu;