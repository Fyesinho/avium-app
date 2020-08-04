import React, {useState} from 'react';
import {connect} from "react-redux";
import InputText from "../../../commons/Inputs/InputText/InputText";
import ButtonAvium from "../../../commons/Button/ButtonAvium";
import RememberAccount from "../RememberAccount/RememberAccount";
import {FontAwesome5} from '@expo/vector-icons';
import {validateEmail} from "../../../../utils/const/functions";
import {login} from "../../../../state/user/actions";
import AsyncStorage from "@react-native-community/async-storage";
import {getProducers} from "../../../../state/producer/actions";
import {getFields} from "../../../../state/field/actions";
import {getLabors} from "../../../../state/labor/actions";
import {getQuarters} from "../../../../state/quarter/actions";

const icon = <FontAwesome5 name="door-open" size={20} color="white"/>;

const FormLogin = ({navigation, getFields, getLogin, getProducers, getLabors, getQuarters}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberAccount, setRememberAccount] = useState(false)

    const login = async () => {
        const response = await getLogin({email, password});
        if (!response) {
            alert('Las credenciales no son correctas, por favor intente nuevamente.')
        } else {
            await getProducers(response.token);
            await getFields(response.token);
            await getLabors(response.token);
            await getQuarters(response.token);
            if (rememberAccount) {
                await AsyncStorage.setItem(`@user`, JSON.stringify(response))
            }
            navigation.push('Home');
        }
    }
    // console.log(rememberAccount)
    return (
        <>
            <InputText
                value={email}
                autoCompleteType={'email'}
                keyboardType={'email-address'}
                placeholder={'correo@correo.cl'}
                autoCapitalize='none'
                onChangeText={email => setEmail(email)}
            />
            <InputText
                value={password}
                placeholder={'******'}
                onChangeText={password => setPassword(password)}
                secureTextEntry={true}
            />
            <ButtonAvium
                disabled={!validateEmail(email) || password.length < 6}
                type={!validateEmail(email) || password.length < 6 ? 'disabled' : ''}
                icon={icon}
                onPress={() => login()}>
                INICIAR SESIÓN
            </ButtonAvium>
            <RememberAccount isEnabled={rememberAccount} setIsEnabled={setRememberAccount}/>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    getLogin: payload => dispatch(login(payload)),
    getProducers: payload => dispatch(getProducers(payload)),
    getFields: payload => dispatch(getFields(payload)),
    getLabors: payload => dispatch(getLabors(payload)),
    getQuarters: payload => dispatch(getQuarters(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);