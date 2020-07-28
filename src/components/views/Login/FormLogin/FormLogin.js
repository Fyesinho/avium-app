import React, {useState} from 'react';
import {connect} from "react-redux";
import InputText from "../../../commons/Inputs/InputText/InputText";
import ButtonAvium from "../../../commons/Button/ButtonAvium";
import RememberAccount from "../RememberAccount/RememberAccount";
import {FontAwesome5} from '@expo/vector-icons';
import {validateEmail} from "../../../../utils/const/functions";
import {login} from "../../../../state/user/actions";
import AsyncStorage from "@react-native-community/async-storage";

const icon = <FontAwesome5 name="door-open" size={20} color="white"/>;

const FormLogin = ({navigation, getLogin, user}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberAccount, setRememberAccount] = useState(false)

    const login = async () => {
        const response = await getLogin({email, password});
        if (!response) {
            alert('Las credenciales no son correctas, por favor intente nuevamente.')
        } else {
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
    getLogin: payload => dispatch(login(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);