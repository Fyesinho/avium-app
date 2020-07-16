import React, {useState} from 'react';
import InputText from "../../../commons/Inputs/InputText/InputText";
import ButtonAvium from "../../../commons/Button/ButtonAvium";
import RememberAccount from "../RememberAccount/RememberAccount";
import {FontAwesome5} from '@expo/vector-icons';
import {validateEmail} from "../../../../utils/const/functions";

const icon = <FontAwesome5 name="door-open" size={20} color="white"/>;

const FormLogin = ({navigation}) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        setIsSubmit(true);
    }

    if (isSubmit) {
        navigation.navigate('Home');
        setIsSubmit(false);
    }

    return (
        <>
            <InputText
                value={email}
                autoCompleteType={'email'}
                keyboardType={'email-address'}
                placeholder={'correo@correo.cl'}
                autoCapitalize = 'none'
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
            <RememberAccount/>
        </>
    );
};

export default FormLogin;