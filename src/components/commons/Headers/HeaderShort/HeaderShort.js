import React, {useState} from 'react';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {Image, ImageBackground, Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import Menu from "../../../views/Menu/Menu";

const image = require('../../../../assets/images/header-large.png')
const logo = require('../../../../assets/images/logo-main.png')

const styles = StyleSheet.create({
    headerLogin: {
        flex: 0.15,
        width: '100%',
        backgroundColor: 'red',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(95, 22, 36, 0.9)',
        paddingLeft: '10%',
        width: '100%'
    },
});

const HeaderShort = ({noBack}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    return (
        <View style={styles.headerLogin}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <Menu setModalVisible={setModalVisible}/>
                </View>
            </Modal>
            <ImageBackground source={image} style={styles.image}>
                <TouchableOpacity onPress={() => noBack ? null : navigation.goBack()}>
                    <AntDesign name="left" size={20} color={noBack ? "transparent" : "white"}/>
                </TouchableOpacity>
                <Image source={logo} style={styles.logo}/>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <MaterialCommunityIcons name="menu" size={26} color="white"/>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default HeaderShort;