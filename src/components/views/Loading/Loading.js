import React from 'react';
import {Image, Modal, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(95, 22, 36, 1)'
    },
    activityIndicatorWrapper: {
        backgroundColor: 'transparent',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    }
});

const logo = require('../../../assets/images/logo-main.png')


const Loading = () => {
    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={true}
            onRequestClose={() => {
                console.log('close modal')
            }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <Image source={logo} style={styles.logo}/>
                </View>
            </View>
        </Modal>
    );
}

export default Loading;