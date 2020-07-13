import React from 'react';
import {StyleSheet, View} from 'react-native';
import Hr from "../../commons/Hr/Hr";
import HeaderLarge from "../../commons/Headers/HeaderLarge/HeaderLarge";
import Title from "../../commons/Title/Title";
import FormLogin from "./FormLogin/FormLogin";
import RecoverPassword from "./RecoverPassword/RecoverPassword";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    bodyLogin: {
        flex: 0.75,
        width: '100%',
        paddingLeft: 40,
        paddingRight: 40
    },
    title: {
        flex: 0.3,
    }
});

class Login extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <HeaderLarge/>
                <View style={styles.bodyLogin}>
                    <Title flex={styles.title}>
                        INICIAR SESIÓN
                    </Title>
                    <FormLogin
                        navigation={this.props.navigation}
                    />
                    <Hr/>
                    <RecoverPassword/>
                </View>
            </View>
        );
    }
}

export default Login;