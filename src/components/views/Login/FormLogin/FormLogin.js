import React, {useState} from 'react';
import InputText from "../../../commons/Inputs/InputText/InputText";
import ButtonAvium from "../../../commons/Button/ButtonAvium";
import RememberAccount from "../RememberAccount/RememberAccount";
import {FontAwesome5} from '@expo/vector-icons';

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
                placeholder={'correo@correo.cl'}
                onChangeText={email => setEmail(email)}
            />
            <InputText
                value={password}
                placeholder={'******'}
                onChangeText={password => setPassword(password)}
            />
            <ButtonAvium disabled={email === '' || password === ''} icon={icon} onPress={() => login()}>
                INICIAR SESIÓN
            </ButtonAvium>
            <RememberAccount/>
        </>
    );
};

export default FormLogin;