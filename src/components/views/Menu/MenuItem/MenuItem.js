import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import Hr from "../../../commons/Hr/Hr";
import {useFonts} from "@use-expo/font";
import {titleFont} from "../../../../utils/const/style";
import Loading from "../../Loading/Loading";

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
    },
    text: {
        textTransform: 'uppercase',
        fontFamily: 'Title',
        fontSize: 25,
        color: '#444444',
        paddingLeft: 15
    }
})


const MenuItem = ({icon, title, to, hr, setModalVisible}) => {
    const navigation = useNavigation();


    const handlerTo = to => {
        if (to === 'Login') {
            AsyncStorage.removeItem('@user')
        }
        navigation.push(to);
        setModalVisible(false)
    }

    let [fontsLoaded] = useFonts(titleFont);
    if (!fontsLoaded) {
        return <Loading/>;
    }

    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.2}}/>
            <View style={{flex: 0.8}}>
                <TouchableOpacity style={style.container} onPress={() => handlerTo(to)}>
                    {icon}
                    <Text style={style.text}>
                        {title}
                    </Text>
                </TouchableOpacity>
                {
                    hr && <Hr/>
                }
            </View>
        </View>
    );
};

export default MenuItem;