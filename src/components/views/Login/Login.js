import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import Hr from "../../commons/Hr/Hr";
import HeaderLarge from "../../commons/Headers/HeaderLarge/HeaderLarge";
import Title from "../../commons/Title/Title";
import FormLogin from "./FormLogin/FormLogin";
import RecoverPassword from "./RecoverPassword/RecoverPassword";
import Loading from "../Loading/Loading";
import AsyncStorage from "@react-native-community/async-storage";
import {loginNoSync} from "../../../state/user/actions";
import {getProducers} from "../../../state/producer/actions";
import {getFields} from "../../../state/field/actions";
import {getLabors} from "../../../state/labor/actions";
import {getQuarter} from "../../../server/quarter";
import {getQuarters} from "../../../state/quarter/actions";

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
    async componentDidMount() {
        try {
            const userTemporal = await AsyncStorage.getItem(`@user`)
            const user = JSON.parse(userTemporal);
            if (user) {
                await this.props.getLogin(user);
                this.props.navigation.navigate('Home')
                await this.props.getProducers(user.token);
                await this.props.getFields(user.token);
                await this.props.getLabors(user.token);
                await this.props.getQuarters(user.token);
            }
        } catch (e) {
            console.log(e)
        }
    }

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

const mapStateToProps = state => ({
    loading: state.loading.loading
})

const mapDispatchToProps = dispatch => ({
    getLogin: payload => dispatch(loginNoSync(payload)),
    getProducers: payload => dispatch(getProducers(payload)),
    getFields: payload => dispatch(getFields(payload)),
    getLabors: payload => dispatch(getLabors(payload)),
    getQuarters: payload => dispatch(getQuarters(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);