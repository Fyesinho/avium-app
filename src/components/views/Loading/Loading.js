import React from 'react';
import {Animated, Easing, Modal, StyleSheet, View} from 'react-native';

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


class Loading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {spinAnim: new Animated.Value(0)}
    }

    componentDidMount() {
        const {spinAnim} = this.state;
        setTimeout(
            function () {
                Animated.loop(Animated.timing(
                    spinAnim,
                    {
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }
                )).start();
            },
            400);
    }

    render() {
        const spin = this.state.spinAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
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
                        <Animated.Image source={logo} style={{...styles.logo, transform: [{rotate: spin}]}}/>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default Loading;