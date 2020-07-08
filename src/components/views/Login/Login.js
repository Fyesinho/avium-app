import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {Link} from "react-router-native";
import Hr from "../../commons/Hr/Hr";
import HeaderLarge from "../../commons/Headers/HeaderLarge/HeaderLarge";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5dc',
        alignItems: 'center',
    },
    bodyLogin: {
        flex: 0.7,
        width: '100%',
        padding: 40,
        paddingRight: 40,
        paddingTop: 50
    },
    title: {
        alignItems: 'center'
    }
});

class Login extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <HeaderLarge/>
                <View style={styles.bodyLogin}>
                    <View style={styles.title}>
                        <Text>INICIAR SESIÓN</Text>
                    </View>
                    <TextInput placeholder={'hola'}/>
                    <TextInput placeholder={'hola'}/>
                    <Button title={'hello'}/>
                    <View>
                        <Text>Recordar cuenta</Text>
                        <Button title={'select'}/>
                    </View>
                    <Hr/>
                    <View>
                        <Text>¿Olvidaste la contraseña?</Text>
                        <Link to={'/recover-password'}>
                            <Text>
                                Recuperala aquí
                            </Text>
                        </Link>
                    </View>
                </View>
            </View>
        );
    }
}

export default Login;